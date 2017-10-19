'use strict';

const idActionParams = [
  {
    key: ':id',
    val: '_id',
  },
];

function getModalPopUp(options) {
  const { onclickProps, style, tooltip, button, type, onclickAddProp, } = options;
  const modalType = {
    tooltip: [
      {
        component: 'Icon',
        props: {
          icon: 'fa fa-info-circle',
          title: options.modalTitle,
          // size: 'isMedium',
        },
      },
    ],
    button: (button)
      ? button.title
      : undefined,
  };
  return {
    component: 'ResponsiveButton',
    props: {
      onClick: 'func:this.props.createModal',
      onclickProps: Object.assign({}, {
        title: options.modalTitle,
        pathname: options.modalPathname,
        // animation:'fadeInDown',
      }, onclickProps),
      style,
      onclickAddProp,
      buttonProps: (button)
        ? Object.assign({}, {
          color: 'isPrimary',
          buttonStyle:'isOutlined',
        }, button.props)
        : undefined,
      // aProps: {},
    },
    children: modalType[ type ] || {},
  };
}

function getPageTitle(options) {
  const { styles = {}, title, tooltip, action, asynctitle, titleprefix, } = options;
  const actionType = {
    link: (action && action.type === 'action')? [
      {
        component: 'ResponsiveButton',
        props: {
          onClick: 'func:this.props.reduxRouter.push',
          onclickProps: action.link,
          // style: {
          //   marginLeft: '10px',
          // },
          buttonProps: {
            color: 'isPrimary',
          },
        },
        children: action.title,
      },
    ]:null,
    action: (action && action.type === 'action')
      ? [
        {
          component: 'ResponsiveButton',
          props: {
            buttonProps: {
              color: (action.method==='DELETE')?'isDanger':'isPrimary',
              buttonStyle:'isOutlined',              
            },
            onClick: 'func:this.props.fetchAction',
            onclickBaseUrl: action.pathname,
            onclickLinkParams: action.pathParams,
            fetchProps: {
              method: action.method,
            },
            'successProps':{
              success:true,
              successCallback: 'func:this.props.reduxRouter.push',
              successProps: action.callbackRedirect,
            },
            confirmModal: action.confirm,
          },
          children: action.title,     
          thisprops: action.thisprops,
          asyncprops: action.asyncprops,
        },
      ]
      : null,
    modal: (action && action.type==='modal')
      ? [
        getModalPopUp({
          modalTitle: action.title,
          modalPathname: action.pathname,
          confirmAction: action.confirm,
          type:'button',
          button: Object.assign({
            title: action.title,
          },action.buttonProps),
        }),
      ]
      : null,
  };
  return {
    component: 'Columns',
    children: [
      {
        component: 'Column',
        children: [
          {
            component: 'Title',
            props: {
              style: styles && styles.ui && styles.ui.topContainerMargin,
            },
            children: [
              (titleprefix)
              ? {
                component: 'span',
                children:titleprefix,
              }
              : null,
              {
                component: 'span',
                children:  title,
              },
              (asynctitle)
                ? {
                  component: 'span',
                  asyncprops: {
                    children: asynctitle,
                  },
                }
                : null,
              (tooltip)  
                ? getModalPopUp({
                  modalTitle: tooltip.title,
                  modalPathname: tooltip.pathname,
                  type:'tooltip',
                  tooltip:true,
                })
                : null,
            ],
          },
        ],
      },
      {
        component: 'Column',
        props: {
          style: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            display: 'flex',
          },
        },
        children: (action)
          ? actionType[action.type] || null
          : null,
      },
    ],
  };
}

function getTitlePrefix(options) {
  const { location, title, } = options;
  return [{
    component: 'ResponsiveLink',
    props: {
      location,
      style: {
        textDecoration:'none',
      },
    },
    children: title,
  }];
}

function getTitleArrow() {
  return [
    {
      component: 'span',
      // props
      children: ' › ',
    },
  ];
}


module.exports = {
  idActionParams,
  getModalPopUp,
  getPageTitle,
  getTitlePrefix,
  getTitleArrow,
};