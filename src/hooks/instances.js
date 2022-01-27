import { useReducer } from 'react';

export function instancesReducer(instances, action) {
  switch (action.type) {
    case 'add': {
      // 添加普通节点
      const result = action.result.filter((e) => {
        return !instances.find((item) => item.did === e.did);
      });

      return [...result, ...instances];
    }
    case 'unregister': {
      // 去除本地节点
      const { did } = action;
      const targetInstanceId = instances.findIndex((e) => e.did === did);
      if (targetInstanceId > -1) {
        const newInstances = instances.filter((e, i) => i !== targetInstanceId);

        try {
          if (localStorage.localServers) {
            const localServers = JSON.parse(localStorage.localServers);

            const targetId = localServers.findIndex((e) => e.did === did);

            if (targetId > -1) {
              localServers.splice(targetId, 1);
              localStorage.localServers = JSON.stringify(localServers);
            }
          }
        } catch (e) {
          console.error('unregister localServer error', e);
        }
        return newInstances;
      }
      return instances;
    }
    case 'register': {
      // 注册节点，相同did情况会更新节点信息
      const { result } = action;
      // 在注册的节点内修正
      const regedInstances = instances.filter((e) => e.source === 'register');

      result.source = 'register';

      // 判断是否已经存在
      const targetIndex = regedInstances.findIndex((e) => e.did === result.did);
      if (targetIndex > -1) {
        // 更新对象数据
        regedInstances.splice(targetIndex, 1, result);
      } else {
        regedInstances.push(result);
      }

      localStorage.setItem('localServers', JSON.stringify(regedInstances));

      // 重新组合 instance 列表
      const newInstances = instances.filter((e) => e.source !== 'register');
      newInstances.push(...regedInstances);
      return newInstances;
    }
    default:
      return instances;
  }
}

export function useInstances() {
  const instances = [];

  // 添加本地节点
  if (localStorage.localServers) {
    let localServers;
    try {
      localServers = JSON.parse(localStorage.localServers).filter((e) => !instances.find((item) => e.did === item.did));
    } catch (e) {
      console.error('parse localServers error', e);
    }

    if (localServers) {
      instances.push(
        ...localServers.map((e) => {
          return {
            ...e,
          };
        })
      );
    }
  }

  return useReducer(instancesReducer, instances);
}
