export default [
    {
        path: "/",
        name: 'index',
        component: resolve => require(['@/views/home.vue'], resolve)
    },
    {
        path: "/home",
        name: 'home',
        component: resolve => require(['@/views/home.vue'], resolve)
    },
    {
        path: "/user",
        name: 'user',
        component: resolve => require(['@/views/user.vue'], resolve)
    },
    {
        path: "/provider",
        name: 'provider',
        component: resolve => require(['@/views/provider.vue'], resolve)
    },
    {
        path: "/notary",
        name: 'notary',
        component: resolve => require(['@/views/notary.vue'], resolve)
    },
    {
        path: "/message",
        name: 'message',
        component: resolve => require(['@/views/messages.vue'], resolve)
    },
];
