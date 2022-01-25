import React from 'react';
import PropTypes from 'prop-types';
import Button from '@arcblock/ux/lib/Button';
import ButtonGroup from '@arcblock/ux/lib/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function SplitButton({ children, size, variant, onClick, color, menulist, startIcon, minWidth }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const onToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant={variant} size={size} color={color} aria-label="split button" rounded style={{ minWidth }}>
        <Button size={size} startIcon={startIcon} onClick={onClick} style={{ flex: 1 }}>
          {children}
        </Button>
        <Button
          size={size}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          ref={anchorRef}
          data-cy="open-install-menu"
          onClick={onToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        disablePortal={false}
        className="popper">
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList id="split-button-menu">
              {menulist.map((e, i) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem data-cy="open-install-form" key={i} onClick={e.onClick}>
                    {e.label}
                  </MenuItem>
                );
              })}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}

SplitButton.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  menulist: PropTypes.array,
  startIcon: PropTypes.any,
  minWidth: PropTypes.string,
};

SplitButton.defaultProps = {
  children: '',
  size: 'medium',
  variant: 'contained',
  color: 'primary',
  onClick: () => {},
  menulist: [],
  startIcon: '',
  minWidth: '',
};
