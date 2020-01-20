const devHosts = ['//127.0.0.1:4321', 'localhost:4321'];
// const prodHosts = ['//127.0.0.1:4321'];
let protocol = window.location.protocol;
let URL = `${protocol}127.0.0.1:4321`;
const isDev = getWorkEnv(devHosts);

if (isDev) {
    URL = 'http://127.0.0.1:4321';
} else {
    // 线上地址
    // todo
    URL = 'http://127.0.0.1:4321';
}
function getWorkEnv(hosts) {
    let _isDev = false;
    let $herf = window.location.href;
    hosts.forEach(function(host) {
        if ($herf.indexOf(host) !== -1) {
            _isDev = true;
        }
    });
    return _isDev;
}
module.exports = {
    URL: URL
};
