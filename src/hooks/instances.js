import { useReducer } from 'react';

export function instancesReducer(instances, action) {
  switch (action.type) {
    case 'unregister':
      {
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
      }
      return instances;
    case 'add':
      // 添加普通节点
      return [...action.result, ...instances];
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
            source: 'register',
          };
        })
      );
    }
  }

  return useReducer(instancesReducer, instances);
}
