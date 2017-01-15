// 审核流程公共方法
/**
 * 新建流程
 * @export
 * @param {any} objid 对象id
 * @param {any} objname 对象名称
 * @param {any} createdBy 创建人
 * @param {any} empname 流程发起人员工姓名
 * @param {any} empid 员工id
 * @param {any} deptid 发起人部门id
 * @param {any} deptname 部门名称
 * @param {any} nextempname 下一个处理人员工姓名
 * @param {any} nextempid 下一个处理人员工id
 * @param {any} nextdeptid 下一个处理人部门id
 * @param {any} nextdeptname 下一个处理人部门名称
 * @param {any} objtype 对象类型
 * @param {any} comments 意见
 * @param {any} remark 备注
 * @returns 创建的流程信息，后续自己处理
 */
export function newProcess(objid, objname, createdBy, empname, empid, deptid, deptname,
  nextempname, nextempid, nextdeptid, nextdeptname,
  objtype, comments, remark) {
  let processInfo = {
    objid: objid,
    objname: objname,
    createdBy: createdBy,
    modifiedBy: createdBy,
    empname: empname,
    empid: empid,
    deptid: deptid,
    deptname: deptname,
    nextempname: nextempname,
    nextempid: nextempid,
    nextdeptid: nextdeptid,
    nextdeptname: nextdeptname,
    objtype1: objtype,
    objtype2: objtype,
    remark: remark,
    comments: comments,
    action: 'Pass'
  }
  return processInfo
}
/**
 * 新建任务（审核通过）
 * @export
 * @param {any} procid 流程id
 * @param {any} taskid 当前任务id
 * @param {any} createdBy 创建人
 * @param {any} empname 发起人员工姓名
 * @param {any} empid 员工id
 * @param {any} deptid 发起人部门id
 * @param {any} deptname 部门名称
 * @param {any} nextempname 下一个处理人员工姓名
 * @param {any} nextempid 下一个处理人员工id
 * @param {any} nextdeptid 下一个处理人部门id
 * @param {any} nextdeptname 下一个处理人部门名称
 * @param {any} comments 意见
 * @param {any} remark  备注
 * @returns 创建任务对象，后面自己处理
 */
export function newTaskPass(procid, taskid, createdBy, empname, empid, deptid, deptname,
  nextempname, nextempid, nextdeptid, nextdeptname,
  comments, remark) {
  let taskInfo = {
    procid: procid,
    taskid: taskid,
    createdBy: createdBy,
    empname: empname,
    empid: empid,
    deptid: deptid,
    deptname: deptname,
    nextempname: nextempname,
    nextempid: nextempid,
    nextdeptname: nextdeptname,
    nextdeptid: nextdeptid,
    remark: remark,
    comments: comments,
    action: 'Pass'
  }
  return taskInfo
}
/**
 * 新建任务（最终批准）
 * @export
 * @param {any} procid 流程id
 * @param {any} taskid 当前任务id
 * @param {any} createdBy 创建人
 * @param {any} empname 发起人员工姓名
 * @param {any} empid 员工id
 * @param {any} deptid 发起人部门id
 * @param {any} deptname 部门名称
 * @param {any} comments 意见
 * @param {any} remark 备注
 * @returns 创建任务对象，后面自己处理
 */
export function newTaskApproval(procid, taskid, createdBy, empname, empid, deptid, deptname, comments, remark) {
  let taskInfo = {
    procid: procid,
    taskid: taskid,
    createdBy: createdBy,
    empname: empname,
    empid: empid,
    deptid: deptid,
    deptname: deptname,
    remark: remark,
    comments: comments,
    action: 'Approve'
  }
  return taskInfo
}
/**
 * 新建任务（驳回）
 * @export
 * @param {any} procid 流程id
 * @param {any} taskid 当前任务id
 * @param {any} createdBy 创建人
 * @param {any} empname 发起人员工姓名
 * @param {any} empid 员工id
 * @param {any} deptid 发起人部门id
 * @param {any} deptname 部门名称
 * @param {any} comments 意见
 * @param {any} remark 备注
 * @returns 创建任务对象，后面自己处理
 */
export function newTaskReject(procid, taskid, createdBy, empname, empid, deptid, deptname, comments, remark) {
  let taskInfo = {
    procid: procid,
    taskid: taskid,
    createdBy: createdBy,
    empname: empname,
    empid: empid,
    deptid: deptid,
    deptname: deptname,
    remark: remark,
    comments: comments,
    action: 'Reject'
  }
  return taskInfo
}
