export const menus = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'open': false,
        'chip': { 'value': 1, 'color': 'accent' },
        'perfil': [1, 2, 3, 4],
        /*'sub': [
            {
                'name': 'Dashboard',
                'link': '/auth/dashboard',
                'icon': 'dashboard',
                'chip': false,
                'open': true,
            }
        ]*/
    },
    { // Menu de Alumnos
        'name': 'Alumnos',
        'icon': 'supervisor_account',
        'open': false,
        'link': false,
        'perfil': [1, 2, 3, 4],
        'sub': [
            {
                'name': 'Nuevo Alumno',
                'icon': 'account_box',
                'open': false,
                'link': 'pages/alumnos/nuevo-alumno',
                'perfil': [1, 2, 3, 4],
            }, /*{
                'name': 'Services',
                'icon': 'local_laundry_service',
                'open': false,
                'link': 'pages/services',
            }, {
                'name': 'Contact',
                'icon': 'directions',
                'open': false,
                'link': 'pages/contact'
            }*/
        ]
    },
    { // Menu de Consultas
        'name': 'Consultas',
        'icon': 'search',
        'open': false,
        'link': false,
        'perfil': [1, 2, 3],
        'sub': [
            {
                'name': 'Consulta de Alumnos',
                'icon': 'supervisor_account',
                'open': false,
                'link': 'pages/consulta/alumnos',
                'perfil': [1, 2, 3, 4],
            }, /*{
                'name': 'Services',
                'icon': 'local_laundry_service',
                'open': false,
                'link': 'pages/services',
            }, {
                'name': 'Contact',
                'icon': 'directions',
                'open': false,
                'link': 'pages/contact'
            }*/
        ]
    },
    { // Menu de Pagos
        'name': 'Pagos',
        'icon': 'account_balance_wallet',
        'open': false,
        'link': false,
        'perfil': [1],
        'sub': [
            {
                'name': 'Registro de Pagos',
                'icon': 'credit_card',
                'open': false,
                'link': 'pages/pagos/registro-pago-alumno',
                'perfil': [1],
            }, {
                'name': 'Revertir Pagos',
                'icon': 'redo',
                'open': false,
                'link': 'pages/pagos/revertir-pago-alumno',
                'perfil': [1],
            }, /*{
                'name': 'Contact',
                'icon': 'directions',
                'open': false,
                'link': 'pages/contact'
            }*/
        ]
    },
    { // Menu de Evaluaciones
        'name': 'Evaluaciones',
        'icon': 'assignment',
        'open': false,
        'link': false,
        'perfil': [1,3],
        'sub': [
            {
                'name': 'Evaluar Alumno',
                'icon': 'description',
                'open': false,
                'link': 'pages/evaluaciones/evaluacion-practica',
                'perfil': [1,3],
            }, /*{
                'name': 'Revertir Pagos',
                'icon': 'redo',
                'open': false,
                'link': 'pages/pagos/revertir-pago-alumno',
                'perfil': [1,3],
            }, {
                'name': 'Contact',
                'icon': 'directions',
                'open': false,
                'link': 'pages/contact'
            }*/
        ]
    },
    { // Menu de Seguridad
        'name': 'Seguridad',
        'icon': 'build',
        'open': false,
        'link': false,
        'perfil': [1],
        'sub': [
            {
                'name': 'Registrar Usuario',
                'icon': 'account_box',
                'open': false,
                'link': 'pages/security/register-user',
                'perfil': [1],
            }, /*{
                'name': 'Revertir Pagos',
                'icon': 'redo',
                'open': false,
                'link': 'pages/pagos/revertir-pago-alumno',
                'perfil': [1,3],
            }, {
                'name': 'Contact',
                'icon': 'directions',
                'open': false,
                'link': 'pages/contact'
            }*/
        ]
    },
    {
        'name': 'Material Widget',
        'icon': 'widgets',
        'link': false,
        'open': false,
        'perfil': [1, 2, 3, 4],
        'sub': [
            {
                'name': 'Buttons',
                'link': 'material-widgets/buttons',
                'icon': 'indeterminate_check_box',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'List',
                'link': 'material-widgets/list',
                'icon': 'list',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {

                'name': 'Stepper',
                'link': 'material-widgets/stepper',
                'icon': 'view_week',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Expansion',
                'link': 'material-widgets/expansion',
                'icon': 'web_aaset',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Progress Spinner',
                'link': 'material-widgets/spinner',
                'icon': 'cached',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Cards',
                'link': 'material-widgets/cards',
                'icon': 'crop_16_9',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Icons',
                'link': 'material-widgets/icons',
                'icon': 'gif',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {

                'name': 'AutoComplete',
                'link': 'material-widgets/autocomplete',
                'icon': 'get_app',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'CheckBox',
                'link': 'material-widgets/checkbox',
                'icon': 'check_box',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'DatePicker',
                'link': 'material-widgets/datepicker',
                'icon': 'date_range',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },

            {
                'name': 'Slider',
                'link': 'material-widgets/slider',
                'icon': 'keyboard_tab',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Slide Toggle',
                'link': 'material-widgets/slide-toggle',
                'icon': 'album',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Menu',
                'icon': 'menu',
                'link': 'material-widgets/menu',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Progress Bar',
                'link': 'material-widgets/progress-bar',
                'icon': 'trending_flat',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Input',
                'icon': 'input',
                'link': 'material-widgets/input',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Radio',
                'icon': 'radio_button_checked',
                'link': 'material-widgets/radio',
                'chip': false,
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Select',
                'icon': 'select_all',
                'link': 'material-widgets/select',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
        ]
    },
    // {
    //     'name'   : 'Forms',
    //     'icon'   : 'mode_edit',
    //     'open'   : false,
    //     'link'   : false,
    //     'sub'    :  [
    //                     {
    //                         'name': 'Template Driven',
    //                         'icon': 'mode_edit',
    //                         'open'   : false,
    //                         'link':'forms/template_forms'
    //                     },
    //                     {
    //                         'name': 'Reactive Forms',
    //                         'icon': 'text_fields',
    //                         'open'   : false,
    //                         'link':'forms/reactive_forms'
    //                     }
    //                 ]
    // },
    {
        'name': 'Tables',
        'icon': 'list',
        'link': false,
        'open': false,
        'chip': { 'value': 2, 'color': 'accent' },
        'perfil': [1, 2, 3, 4],
        'sub': [
            {
                'name': 'Fixed',
                'icon': 'filter_list',
                'link': 'tables/fixed',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Feature',
                'icon': 'done_all',
                'link': 'tables/featured',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Responsive Tables',
                'icon': 'filter_center_focus',
                'link': 'tables/responsive',
                'open': false,
                'perfil': [1, 2, 3, 4],
            }
        ]

    },
    {
        'name': 'Guarded Routes',
        'icon': 'mode_edit',
        'link': '/auth/guarded-routes',
        'open': false,
        'perfil': [1, 2, 3, 4],
    }, {
        'name': 'Scrumboard',
        'open': false,
        'link': '/auth/scrumboard',
        'icon': 'grade',
        'perfil': [1, 2, 3, 4],
    }, {
        'name': 'Applications',
        'icon': 'view_module',
        'open': false,
        'link': false,
        'perfil': [1, 2, 3, 4],
        'sub': [
            {
                'name': 'chat',
                'icon': 'chat',
                'link': 'chats/chat',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'mail',
                'icon': 'mail',
                'link': 'mail/mail',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'Editor',
                'icon': 'editor',
                'link': 'editor/editor',
                'open': false,
                'perfil': [1, 2, 3, 4],
            }
        ]
    }
    , {
        'name': 'Pages',
        'icon': 'content_copy',
        'open': false,
        'link': false,
        'perfil': [1, 2, 3, 4],
        'sub': [
            {
                'name': 'Login',
                'icon': 'work',
                'open': false,
                'link': '../login',
                'perfil': [1, 2, 3, 4],
            }, {
                'name': 'Services',
                'icon': 'local_laundry_service',
                'open': false,
                'link': 'pages/services',
                'perfil': [1, 2, 3, 4],
            }, {
                'name': 'Contact',
                'icon': 'directions',
                'open': false,
                'link': 'pages/contact',
                'perfil': [1, 2, 3, 4],
            }
        ]
    }
    , {

        'name': 'Charts',
        'icon': 'pie_chart_outlined',
        'open': false,
        'link': false,
        'perfil': [1, 2, 3, 4],
        'sub': [
            {
                'name': 'chartjs',
                'icon': 'view_list',
                'link': 'charts/chartjs',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'ngx-chart',
                'icon': 'show_chart',
                'open': false,
                'link': 'charts/ngx-charts',
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'nvd3',
                'icon': 'pie_chart',
                'open': false,
                'link': 'charts/nvd3-charts',
                'perfil': [1, 2, 3, 4],
            }
        ]
    }, {
        'name': 'maps',
        'icon': 'map',
        'open': false,
        'link': false,
        'perfil': [1, 2, 3, 4],
        'sub': [
            {
                'name': 'google-map',
                'icon': 'directions',
                'link': 'maps/googlemap',
                'open': false,
                'perfil': [1, 2, 3, 4],
            },
            {
                'name': 'leaflet-map',
                'icon': 'directions',
                'link': 'maps/leafletmap',
                'open': false,
                'perfil': [1, 2, 3, 4],
            }
        ]
    }
];
