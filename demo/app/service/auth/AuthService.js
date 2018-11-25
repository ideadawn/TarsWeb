let AuthDao = require('../../dao/AuthDao');
let logger = require('../../logger');

const AuthService = {}

AuthService.addAuth = async(authList) => {
    let newAuthList = [];
    authList.forEach((auth)=> {
        newAuthList.push({
            flag: auth.flag,
            role: auth.role,
            uid: auth.uid
        });
    });
    return AuthDao.insertAuth(newAuthList);
};

AuthService.deleteAuth = async(flag, role) => {
    if(role){
        await AuthDao.deleteAuth({
            flag,
            role
        });
    }else{
        await AuthDao.deleteAuth({
            flag
        });
    }
};

AuthService.updateAuth = async(flag, role, uids) => {
    let newAuthList = [];
    uids.forEach((uid)=> {
        newAuthList.push({flag: flag, role: role, uid: uid});
    });
    await AuthDao.deleteAuth(flag, role);
    return await AuthDao.insertAuth(newAuthList);
};

AuthService.getAuth = async(flag, roles, uid) => {
    return await AuthDao.getAuth(flag, roles, uid);
};

AuthService.getAuthListByUid = async(uid) => {
    return await AuthDao.getAuthList({uid: uid});
};

AuthService.getAuthListByFlag = async(flag) => {
    return await AuthDao.getAuthList({flag: flag});
};
AuthService.getAuthList = async(flag, role, uid) =>{
    let params = {};
    if (flag !== undefined && flag !== null) {
        params.flag = flag;
    }
    if (role !== undefined && role !== null) {
        params.role = role;
    }
    if (uid !== undefined && uid !== null) {
        params.uid = uid;
    }
    return await AuthDao.getAuthList(params, 'DESC');
};

AuthService.pageDeleteAuth = async(id) => {
    return await AuthDao.deleteAuthById(id);
}

module.exports = AuthService;
