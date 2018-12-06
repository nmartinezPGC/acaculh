import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {

    public dashCard = [
        { colorDark: '#5C6BC0', colorLight: '#7986CB', number: 925, title: 'ALUMNOS', icon: 'local_grocery_store' },
        { colorDark: '#42A5F5', colorLight: '#64B5F6', number: '12,500', title: 'PAGOS', icon: 'new_releases' },
        { colorDark: '#26A69A', colorLight: '#4DB6AC', number: 205, title: 'PLATOS', icon: 'assignments' },
        { colorDark: '#66BB6A', colorLight: '#81C784', number: 215, title: 'GRADUADOS', icon: 'account_balance' }
    ];

    tableData = [
        { country: 'India', sales: 5400, percentage: '40%' },
        { country: 'Us', sales: 3200, percentage: '30.33%' },
        { country: 'Australia', sales: 2233, percentage: '18.056%' },
        { country: 'Spaim', sales: 600, percentage: '6%' },
        { country: 'China', sales: 200, percentage: '4.50%' },
        { country: 'Brazil', sales: 100, percentage: '2.50%' },
    ];

    constructor() { }

    ngOnInit() {
    }

}
