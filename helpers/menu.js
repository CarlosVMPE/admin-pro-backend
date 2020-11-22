
const getMenuOptions = (role = 'USER_ROLE') => {
    const menu = [
        {
            titulo: 'Dashboards',
            icon: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuario', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' },
            ]
        }
    ];

    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({ titulo: 'Usuario', url: 'usuarios' });
    }

    return menu;
}

module.exports = {
    getMenuOptions
}