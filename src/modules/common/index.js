//定义模块名
//------------------此部分可以修改-------------------
const modulename = 'common';
//------------------------------ -------------------
const instance = Constant(modulename);

export default ({
    ...instance,
    NAME:modulename,
    of : instance.of
});