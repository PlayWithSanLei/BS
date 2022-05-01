import Home from 'page/home/index.jsx';
import Login from "page/login/index.jsx";

export const routerMap = [
  {path: '/', name: 'home', component: Home, auth: true},
  {path: '/login', name: 'Login', component: Login},
]
