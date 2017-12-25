/*
Navicat MySQL Data Transfer

Source Server         : local_3306_root
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : dqcenter

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2017-12-18 07:10:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for au_city
-- ----------------------------
DROP TABLE IF EXISTS `au_city`;
CREATE TABLE `au_city` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `CITY_CODE` varchar(256) default NULL COMMENT '城市代码，3位为一级，以.分隔。如：001.001',
  `CITY_NAME` varchar(256) default NULL COMMENT '城市名称',
  `CITY_TYPE` varchar(2) default NULL COMMENT '城市类别，1：省；2：市；',
  `SUPER_CITY_ID` varchar(64) default NULL COMMENT '上级省市ID，外键',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='城市表';

-- ----------------------------
-- Records of au_city
-- ----------------------------
INSERT INTO `au_city` VALUES ('1', '1', 'zz', '1', null, '0', '0', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for au_menu
-- ----------------------------
DROP TABLE IF EXISTS `au_menu`;
CREATE TABLE `au_menu` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `menu_name` varchar(64) default NULL COMMENT '菜单名称',
  `menu_code` varchar(256) default NULL COMMENT '菜单代码',
  `menu_level` varchar(2) default NULL,
  `has_child` varchar(2) default NULL,
  `icon_code` varchar(256) default NULL COMMENT '图标代码',
  `menu_path` varchar(256) default NULL COMMENT '菜单路径',
  `super_id` varchar(64) default NULL COMMENT '外键，父菜单ID',
  `menu_order` decimal(8,0) default NULL COMMENT '菜单排序',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of au_menu
-- ----------------------------
INSERT INTO `au_menu` VALUES ('00a56c90-153f-11e4-8d1d-0025645860c1', '检验sql', '6', '2', '0', '6', '/repository/validateSql/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '6', '0', '1', '3', 'Admin', '2014-07-27 11:35:06', null, null, null);
INSERT INTO `au_menu` VALUES ('01d8c658-b915-1032-acf3-2b1e150e0901', '其它', 'qt', '1', '0', '', '', '', '5', '0', '0', '3', 'Admin', '2014-11-09 11:59:38', null, null, null);
INSERT INTO `au_menu` VALUES ('03ee1da8-1251-11e4-ab05-0ad81e0fef82', '计划任务_old', 'jhrw_old', '2', '0', '', '/repository/scheduler/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '9', '0', '0', '3', 'Admin', '2014-07-23 18:06:30', '3', 'Admin', '2015-01-11 13:23:32');
INSERT INTO `au_menu` VALUES ('100000', '系统管理', '', '1', '1', 'icon-cogs', '', null, '1', '1', '0', null, null, null, '', '', '2014-03-28 14:09:49');
INSERT INTO `au_menu` VALUES ('100001', '组织机构管理', 'MENU_ORG', '2', '0', '', '/system/org/', '100000', '4', '1', '0', null, null, null, '', '', '2014-04-02 15:14:23');
INSERT INTO `au_menu` VALUES ('100002', '用户管理', 'MENU_USER', '2', '0', '', '/system/user/', '100000', '1', '1', '0', null, null, null, '', '', '2014-04-02 15:14:14');
INSERT INTO `au_menu` VALUES ('100003', '角色管理', 'MENU_ROLE', '2', '0', '', '/system/role/', '100000', '2', '1', '0', null, null, null, '', '', '2014-04-02 15:11:51');
INSERT INTO `au_menu` VALUES ('100004', '菜单管理', 'MENU_MENU', '2', '0', '', '/system/menu/', '100000', '3', '1', '0', null, null, null, '', '', '2014-04-02 15:14:03');
INSERT INTO `au_menu` VALUES ('100005', '权限管理', '100.005', '2', '0', null, null, '100000', '5', '1', '1', null, null, null, null, null, null);
INSERT INTO `au_menu` VALUES ('18aad733-6698-1032-99ce-b7bd90984baf', '计划任务', 'jhrw', '2', '0', '', '/repository/schedulerLogic/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '11', '1', '0', '3', 'Admin', '2014-07-27 12:38:54', '3', 'Admin', '2015-01-11 13:24:32');
INSERT INTO `au_menu` VALUES ('2623544c-153d-11e4-ab37-0997d771b126', '数据源管理', 'sjygl', '2', '0', '', '/repository/connection/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '2', '1', '0', '3', 'Admin', '2014-07-27 11:21:50', null, null, null);
INSERT INTO `au_menu` VALUES ('2ed0ab4d-b977-11e3-abbe-24b6fd43a047', '报表管理', 'report', '1', '1', 'menu-icon fa fa-desktop', '/report/', '', '5', '1', '0', '', '', '2014-04-01 16:25:29', '3', 'Admin', '2015-04-11 11:36:07');
INSERT INTO `au_menu` VALUES ('359d0335-0110-11e4-995b-c9c78751fd04', '城市管理', '22', '2', '0', '', '/system/city/', '01d8c658-b915-1032-acf3-2b1e150e0901', '3', '1', '0', '3', 'Admin', '2014-07-01 19:09:45', '3', 'Admin', '2014-07-01 19:10:52');
INSERT INTO `au_menu` VALUES ('37ad2059-b624-11e3-bf47-24b6fd43a047', '业务管理', 'bu', '1', '1', 'icon-briefcase', '', '', '2', '1', '0', '', '', '2014-03-28 10:54:02', '3', 'Admin', '2015-04-11 12:00:38');
INSERT INTO `au_menu` VALUES ('44d6cc36-b2fa-1032-8483-8970969f59e2', 'InfoDw数据源', 'infodwsjy', '2', '0', '', '/repository/repositoryInfodw/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '1', '1', '0', '3', 'Admin', '2014-11-01 17:33:07', '3', 'Admin', '2014-11-01 17:33:17');
INSERT INTO `au_menu` VALUES ('56e2d09b-625a-11e4-908c-0025645860c1', '参数变量', 'csbl', '2', '0', '', '/repository/validateSqlVar/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '5', '1', '0', '3', 'Admin', '2014-11-02 14:31:36', '3', 'Admin', '2014-11-02 14:32:05');
INSERT INTO `au_menu` VALUES ('5a43df8b-b97c-11e3-abbe-24b6fd43a047', '报表1-2', '', '3', '0', '1', '121', '981e2771-b979-11e3-abbe-24b6fd43a047', '12', '1', '1', '', '', '2014-04-01 17:02:30', null, null, null);
INSERT INTO `au_menu` VALUES ('842a58a8-b629-11e3-bf47-24b6fd43a047', '申报入职', '', '2', '0', '', '', '89807a24-b628-11e3-bf47-24b6fd43a047', '1', '1', '1', '', '', '2014-03-28 11:31:53', null, null, null);
INSERT INTO `au_menu` VALUES ('89807a24-b628-11e3-bf47-24b6fd43a047', '入职管理', '', '1', '0', '', '', '', '3', '1', '1', '', '', '2014-03-28 11:24:57', null, null, null);
INSERT INTO `au_menu` VALUES ('8bc54ad3-153d-11e4-ab37-0997d771b126', '联系人信息', 'lxrxx', '2', '0', '', '/contactMethod/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '3', '1', '0', '3', 'Admin', '2014-07-27 11:24:41', null, null, null);
INSERT INTO `au_menu` VALUES ('91793266-b654-11e3-bf47-24b6fd43a047', '薪资发放', '', '2', '0', '', '', 'e7cb2d32-b629-11e3-bf47-24b6fd43a047', '1', '1', '1', '', '', '2014-03-28 16:40:08', null, null, null);
INSERT INTO `au_menu` VALUES ('924aec01-b932-1032-acf3-2b1e150e0901', '验证结果', 'yzjg', '2', '0', '', '/repository/validateResult', '37ad2059-b624-11e3-bf47-24b6fd43a047', '13', '1', '0', '3', 'Admin', '2014-11-09 15:31:16', '3', 'Admin', '2014-11-09 15:31:46');
INSERT INTO `au_menu` VALUES ('93f806e2-b622-11e3-bf47-24b6fd43a047', '数据字典', '', '2', '0', '', '', '100000', '6', '1', '0', '', '', '2014-03-28 10:42:17', null, null, null);
INSERT INTO `au_menu` VALUES ('981e2771-b979-11e3-abbe-24b6fd43a047', '报表1', '', '2', '0', '123', '/testpage', '2ed0ab4d-b977-11e3-abbe-24b6fd43a047', '1', '1', '0', '', '', '2014-04-01 16:42:45', '', '', '2014-04-01 17:27:31');
INSERT INTO `au_menu` VALUES ('ad124399-b97b-11e3-abbe-24b6fd43a047', '报表1-1', '', '3', '0', '3', '2', '981e2771-b979-11e3-abbe-24b6fd43a047', '1', '1', '1', '', '', '2014-04-01 16:57:39', null, null, null);
INSERT INTO `au_menu` VALUES ('b0b8c076-0033-11e4-97b0-c4f26e4f4364', 'Flow', '4', '2', '0', '', '/repository/flow/', '01d8c658-b915-1032-acf3-2b1e150e0901', '20', '1', '0', '3', 'Admin', '2014-06-30 16:51:13', '3', 'Admin', '2014-07-01 19:13:27');
INSERT INTO `au_menu` VALUES ('b6dc6ec1-b629-11e3-bf47-24b6fd43a047', '客户管理', '', '2', '0', '', '', '01d8c658-b915-1032-acf3-2b1e150e0901', '1', '1', '0', '', '', '2014-03-28 11:33:20', null, null, null);
INSERT INTO `au_menu` VALUES ('b89761f2-b973-11e3-abbe-24b6fd43a047', 'test1', '', '2', '0', 'test1', '/test1/index', '100000', '9', '1', '1', '', '', '2014-04-01 16:00:42', null, null, null);
INSERT INTO `au_menu` VALUES ('bbba6d62-b623-11e3-bf47-24b6fd43a047', '岗位管理', '', '2', '0', '', '', '100000', '7', '1', '0', '', '', '2014-03-28 10:50:34', null, null, null);
INSERT INTO `au_menu` VALUES ('d118f175-b62a-11e3-bf47-24b6fd43a047', '薪资计算', '', '2', '0', '', '', 'e7cb2d32-b629-11e3-bf47-24b6fd43a047', '1', '1', '1', '', '', '2014-03-28 11:41:16', null, null, null);
INSERT INTO `au_menu` VALUES ('e7cb2d32-b629-11e3-bf47-24b6fd43a047', '薪资管理', '', '1', '0', '', '', '', '4', '1', '1', '', '', '2014-03-28 11:34:45', null, null, null);
INSERT INTO `au_menu` VALUES ('e8956332-0fec-11e4-ba9d-4ebbbd82541e', '定制验证', 'dzyz', '2', '0', '', '/repository/validateCust/', '37ad2059-b624-11e3-bf47-24b6fd43a047', '7', '1', '0', '3', 'Admin', '2014-07-20 17:04:51', '3', 'Admin', '2014-07-20 17:05:23');
INSERT INTO `au_menu` VALUES ('f3954315-b975-11e3-abbe-24b6fd43a047', 'tex12', '', '2', '0', '3123', '123', '100000', '123', '1', '1', '', '', '2014-04-01 16:16:40', null, null, null);
INSERT INTO `au_menu` VALUES ('f84beb82-b975-11e3-abbe-24b6fd43a047', '23425', '', '2', '0', '345', '2345', '100000', '234', '1', '1', '', '', '2014-04-01 16:16:48', null, null, null);

-- ----------------------------
-- Table structure for au_org
-- ----------------------------
DROP TABLE IF EXISTS `au_org`;
CREATE TABLE `au_org` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `ORG_NAME` varchar(256) default NULL COMMENT '组织名称',
  `ORG_CODE` varchar(256) default NULL COMMENT '组织代码，3位为一级，以.分隔。如：001.001',
  `SUPER_ORG_ID` varchar(64) default NULL COMMENT '外键，上级组织ID。顶层节点为空',
  `HAS_CHILD` varchar(2) default NULL,
  `ORG_LEVEL` varchar(2) default NULL,
  `ORG_TYPE` varchar(2) default NULL COMMENT '组织类型，10：FESCOAdecco 公司；11：FESCOAdecco部门；20：供应商；21：供应商分支机构',
  `CITY_ID` varchar(64) default NULL COMMENT '外键，城市ID',
  `CITY_CODE` varchar(256) default NULL COMMENT '城市代码，3位为一级，以.分隔。如：001.001',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组织机构表';

-- ----------------------------
-- Records of au_org
-- ----------------------------
INSERT INTO `au_org` VALUES ('100001', '南京fesco公司', '101', null, '1', '1', '1', '1', null, '1', '0', null, null, null, null, null, null);
INSERT INTO `au_org` VALUES ('100002', '销售总部', '101.02', '100001', '1', '2', '2', '1', null, '1', '0', null, null, null, null, null, null);
INSERT INTO `au_org` VALUES ('100003', '销售一部', '101.02.01', '100002', '0', '3', '3', '1', null, '1', '0', null, null, null, null, null, null);
INSERT INTO `au_org` VALUES ('100004', '安徽fesco公司', '102', null, '1', '1', '1', '1', null, '1', '0', null, null, null, null, null, null);
INSERT INTO `au_org` VALUES ('100005', '运营总部', '102.01', '100004', '0', '2', '2', '1', null, '1', '0', null, null, null, null, null, null);
INSERT INTO `au_org` VALUES ('100006', '市场部', '101.01', '100001', '0', '2', '2', '1', null, '1', '0', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for au_post
-- ----------------------------
DROP TABLE IF EXISTS `au_post`;
CREATE TABLE `au_post` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `POST_CODE` varchar(255) default NULL,
  `POST_NAME` varchar(255) default NULL,
  `SUPER_POST_ID` varchar(64) default NULL,
  `HAS_CHILD` varchar(2) default NULL,
  `POST_LEVEL` varchar(2) default NULL,
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='岗位表';

-- ----------------------------
-- Records of au_post
-- ----------------------------
INSERT INTO `au_post` VALUES ('0cc008bd-0b80-1032-a33d-e4fe4a7a8220', '102.01.01', '业务员1号', 'fdabc4a3-0b7f-1032-a33d-e4fe4a7a8220', '0', '3', '1', '0', null, null, null, '', '', '2014-04-02 14:28:28');
INSERT INTO `au_post` VALUES ('100001', '101', '客服总监', null, '1', '1', '1', '0', null, null, null, null, null, null);
INSERT INTO `au_post` VALUES ('100002', '101.01', '客服一部经理', '100001', '1', '2', '1', '0', null, null, null, null, null, null);
INSERT INTO `au_post` VALUES ('3bef9e58-0b80-1032-a33d-e4fe4a7a8220', '102.01.02', '业务员2号', 'fdabc4a3-0b7f-1032-a33d-e4fe4a7a8220', '0', '3', '0', '0', '', '', '2014-04-02 14:28:49', null, null, null);
INSERT INTO `au_post` VALUES ('41e8b76b-0b79-1032-a33d-e4fe4a7a8220', '101.01.01', '1号客服', '100002', '0', '3', '1', '0', '', '', '2014-04-02 13:38:53', null, null, null);
INSERT INTO `au_post` VALUES ('eb687e0d-0b7f-1032-a33d-e4fe4a7a8220', '102', '销售总监', '', '1', '1', '1', '0', '', '', '2014-04-02 14:26:34', null, null, null);
INSERT INTO `au_post` VALUES ('fdabc4a3-0b7f-1032-a33d-e4fe4a7a8220', '102.01', '销售一部经理', 'eb687e0d-0b7f-1032-a33d-e4fe4a7a8220', '1', '2', '0', '0', null, null, null, '', '', '2014-04-02 14:27:45');

-- ----------------------------
-- Table structure for au_post_org_rel
-- ----------------------------
DROP TABLE IF EXISTS `au_post_org_rel`;
CREATE TABLE `au_post_org_rel` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `POST_ID` varchar(64) default NULL COMMENT '用户ID,外键',
  `ORG_ID` varchar(64) default NULL COMMENT '组织ID，外键',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='岗位与组织机构关系表';

-- ----------------------------
-- Records of au_post_org_rel
-- ----------------------------

-- ----------------------------
-- Table structure for au_role
-- ----------------------------
DROP TABLE IF EXISTS `au_role`;
CREATE TABLE `au_role` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `ROLE_NAME` varchar(255) default NULL,
  `ROLE_CODE` varchar(255) default NULL,
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of au_role
-- ----------------------------
INSERT INTO `au_role` VALUES ('0f424473-b65a-11e3-bf47-24b6fd43a047', 'QA', 'ROLE_A', '1', '0', null, '小样', '2014-03-28 17:19:27', null, null, null);
INSERT INTO `au_role` VALUES ('100002', '超级管理员', 'ROLE_B', '1', '0', null, null, null, '3', 'Admin', '2014-07-01 19:11:25');
INSERT INTO `au_role` VALUES ('48ab9804-b656-11e3-bf47-24b6fd43a047', '高级销售员', 'ROLE_C', '1', '0', null, null, '2014-03-28 16:52:25', null, null, '2014-03-31 17:59:04');
INSERT INTO `au_role` VALUES ('4eabfe38-b65c-11e3-bf47-24b6fd43a047', '测试员', 'ROLE_D', '1', '0', null, null, '2014-03-28 17:35:32', null, null, null);
INSERT INTO `au_role` VALUES ('59536872-b65a-11e3-bf47-24b6fd43a047', '联络员', 'ROLE_E', '1', '0', null, null, '2014-03-28 17:21:31', null, null, null);
INSERT INTO `au_role` VALUES ('6207e9bd-b65c-11e3-bf47-24b6fd43a047', '董事长', 'ROLE_F', '1', '0', null, null, '2014-03-28 17:36:05', null, null, null);
INSERT INTO `au_role` VALUES ('62668674-b65a-11e3-bf47-24b6fd43a047', '客服部总经理', 'ROLE_G', '1', '0', null, null, '2014-03-28 17:21:46', null, null, null);
INSERT INTO `au_role` VALUES ('6b3e134c-b65a-11e3-bf47-24b6fd43a047', '销售经理', 'ROLE_H', '1', '0', null, null, '2014-03-28 17:22:01', null, null, null);
INSERT INTO `au_role` VALUES ('72070b45-b65a-11e3-bf47-24b6fd43a047', 'IT部', 'ROLE_I', '1', '0', null, null, '2014-03-28 17:22:13', null, null, null);
INSERT INTO `au_role` VALUES ('7ba12a8e-b65a-11e3-bf47-24b6fd43a047', '总经理', 'ROLE_J', '1', '0', null, null, '2014-03-28 17:22:29', null, null, null);
INSERT INTO `au_role` VALUES ('bc107abe-b654-11e3-bf47-24b6fd43a047', '系统管理员', 'ROLE_K', '1', '0', null, null, '2014-03-28 16:41:20', null, null, null);
INSERT INTO `au_role` VALUES ('beb1a1ab-b657-11e3-bf47-24b6fd43a047', '客服', 'ROLE_L', '1', '0', null, null, '2014-03-28 17:02:53', null, null, null);
INSERT INTO `au_role` VALUES ('de1280b4-b654-11e3-bf47-24b6fd43a047', '普通用户', 'ROLE_M', '1', '0', null, null, '2014-03-28 16:42:17', null, null, null);

-- ----------------------------
-- Table structure for au_role_menu_rel
-- ----------------------------
DROP TABLE IF EXISTS `au_role_menu_rel`;
CREATE TABLE `au_role_menu_rel` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `ROLE_ID` varchar(64) default NULL COMMENT '角色ID，外键',
  `MENU_ID` varchar(64) default NULL COMMENT '菜单ID,外键',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色菜单关系表';

-- ----------------------------
-- Records of au_role_menu_rel
-- ----------------------------
INSERT INTO `au_role_menu_rel` VALUES ('04bb2c0c-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '100002', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('04c68c6b-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '100003', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('04ccaa7f-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '100004', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('04d1fbec-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '100001', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('04e0d701-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', 'b6dc6ec1-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('04e41b19-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '842a58a8-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('04e77531-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '100000', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('04eaa102-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '37ad2059-b624-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('0510f5e1-b951-11e3-abbe-24b6fd43a047', '4eabfe38-b65c-11e3-bf47-24b6fd43a047', '89807a24-b628-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:52:17', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('111', 'bc107abe-b654-11e3-bf47-24b6fd43a047', 'b0b8c076-0033-11e4-97b0-c4f26e4f4364', '1', '0', null, null, '2014-07-01 10:45:41', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42778c0d-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', '100002', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('427c6046-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', '100003', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42866a8c-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', '100004', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42911d2f-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', '93f806e2-b622-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('429555cb-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', 'b6dc6ec1-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('4298708f-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', '91793266-b654-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('429c0dd4-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', '100000', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42a44922-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', '37ad2059-b624-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42acc50c-b963-11e3-abbe-24b6fd43a047', '6207e9bd-b65c-11e3-bf47-24b6fd43a047', 'e7cb2d32-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 14:02:52', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42ccb757-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '100002', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42da55d0-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '100003', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42e2e4c8-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '100004', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42e901c3-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '100001', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42ec7da0-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '93f806e2-b622-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42f58843-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', 'bbba6d62-b623-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42f9cd76-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', 'b6dc6ec1-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('42fede59-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '842a58a8-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('4302241c-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '91793266-b654-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('430577e6-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', 'd118f175-b62a-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('4308f12e-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '981e2771-b979-11e3-abbe-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('430faada-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '100000', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('4312e4ba-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '37ad2059-b624-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('4317ff1c-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '89807a24-b628-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('43225c1b-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', 'e7cb2d32-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('432586b7-ba37-11e3-9b6f-24b6fd43a047', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '2ed0ab4d-b977-11e3-abbe-24b6fd43a047', '1', '0', null, null, '2014-04-02 15:20:26', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6beb3ae3-ba12-11e3-9b6f-24b6fd43a047', '100002', '100002', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6bf5998e-ba12-11e3-9b6f-24b6fd43a047', '100002', '100003', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6bf90252-ba12-11e3-9b6f-24b6fd43a047', '100002', '100004', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c00a919-ba12-11e3-9b6f-24b6fd43a047', '100002', '100001', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c06d82b-ba12-11e3-9b6f-24b6fd43a047', '100002', '93f806e2-b622-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c0b9ef0-ba12-11e3-9b6f-24b6fd43a047', '100002', 'bbba6d62-b623-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c0ec292-ba12-11e3-9b6f-24b6fd43a047', '100002', 'b6dc6ec1-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c12301a-ba12-11e3-9b6f-24b6fd43a047', '100002', '842a58a8-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c159a70-ba12-11e3-9b6f-24b6fd43a047', '100002', '91793266-b654-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c1de5bf-ba12-11e3-9b6f-24b6fd43a047', '100002', 'd118f175-b62a-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c237a0d-ba12-11e3-9b6f-24b6fd43a047', '100002', '981e2771-b979-11e3-abbe-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c286831-ba12-11e3-9b6f-24b6fd43a047', '100002', '100000', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c2cfa33-ba12-11e3-9b6f-24b6fd43a047', '100002', '37ad2059-b624-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c30530b-ba12-11e3-9b6f-24b6fd43a047', '100002', '89807a24-b628-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c33b837-ba12-11e3-9b6f-24b6fd43a047', '100002', 'e7cb2d32-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6c36ffd6-ba12-11e3-9b6f-24b6fd43a047', '100002', '2ed0ab4d-b977-11e3-abbe-24b6fd43a047', '1', '0', null, null, '2014-04-02 10:56:43', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6dc43eda-b951-11e3-abbe-24b6fd43a047', '0f424473-b65a-11e3-bf47-24b6fd43a047', '842a58a8-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:55:13', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6dcdb8c2-b951-11e3-abbe-24b6fd43a047', '0f424473-b65a-11e3-bf47-24b6fd43a047', '91793266-b654-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:55:13', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6dd22940-b951-11e3-abbe-24b6fd43a047', '0f424473-b65a-11e3-bf47-24b6fd43a047', '89807a24-b628-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:55:13', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6ddc58f0-b951-11e3-abbe-24b6fd43a047', '0f424473-b65a-11e3-bf47-24b6fd43a047', 'e7cb2d32-b629-11e3-bf47-24b6fd43a047', '1', '0', null, null, '2014-04-01 11:55:13', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6fa19713-ba33-11e3-9b6f-24b6fd43a047', 'de1280b4-b654-11e3-bf47-24b6fd43a047', '100002', '1', '0', null, null, '2014-04-02 14:53:03', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6fab5523-ba33-11e3-9b6f-24b6fd43a047', 'de1280b4-b654-11e3-bf47-24b6fd43a047', '100003', '1', '0', null, null, '2014-04-02 14:53:03', null, null, null);
INSERT INTO `au_role_menu_rel` VALUES ('6fb7b81f-ba33-11e3-9b6f-24b6fd43a047', 'de1280b4-b654-11e3-bf47-24b6fd43a047', '100000', '1', '0', null, null, '2014-04-02 14:53:03', null, null, null);

-- ----------------------------
-- Table structure for au_user
-- ----------------------------
DROP TABLE IF EXISTS `au_user`;
CREATE TABLE `au_user` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `username` varchar(256) default NULL COMMENT '用户名',
  `passwd` varchar(256) default NULL COMMENT '密码',
  `realname` varchar(256) default NULL COMMENT '员工姓名',
  `email` varchar(256) default NULL COMMENT 'Email',
  `login_ip` varchar(256) default NULL COMMENT '最后登录IP',
  `login_time` datetime default NULL COMMENT '最后登录时间',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of au_user
-- ----------------------------
INSERT INTO `au_user` VALUES ('09fa7b4a-50d7-1033-9b50-dac85d7535aa', 'tttt', '96e79218965eb72c92a549dd5a330112', 'ttt', '', null, null, '1', '1', '3', 'Admin', '2015-05-21 14:58:59', null, null, null);
INSERT INTO `au_user` VALUES ('1', 'SuperAdmin', '96e79218965eb72c92a549dd5a330112', '超级管理员', 'SuperAdmin@test.com', null, null, '1', '0', null, null, null, null, null, null);
INSERT INTO `au_user` VALUES ('1424f55d-1fd5-1035-88de-6cf37c96799c', 'qwqw', 'b59c67bf196a4758191e42f76670ceba', '超t', 'jiang222@test.com', null, null, '1', '0', null, null, null, null, null, null);
INSERT INTO `au_user` VALUES ('1aefc110-219c-1033-be98-69e748b5b362', 'tt', '96e79218965eb72c92a549dd5a330112', '测试1', 'jianggenliang@kzcpm.com', null, null, '1', '0', '3', 'Admin', '2015-03-22 12:28:46', '3', 'Admin', '2015-03-22 12:28:57');
INSERT INTO `au_user` VALUES ('1e109fa2-50dc-1033-9b50-dac85d7535aa', 'jiang', '7fa8282ad93047a4d6fe6111c93b308a', '蒋根亮', 'jianggenliang@kzcpm.com', null, null, '0', '0', '3', 'Admin', '2015-05-21 15:35:21', '3', 'Admin', '2015-05-21 15:35:39');
INSERT INTO `au_user` VALUES ('2', 'DefUser', '698d51a19d8a121ce581499d7b701668', '普通用户', 'DefUser@test.com', '0:0:0:0:0:0:0:1', '2016-12-30 15:31:02', '1', '0', null, null, null, null, null, null);
INSERT INTO `au_user` VALUES ('3', 'Admin', '96e79218965eb72c92a549dd5a330112', '系统管理员', 'admin@test.com', '127.0.0.1', '2017-12-18 01:32:33', '1', '0', null, null, null, null, null, null);
INSERT INTO `au_user` VALUES ('db969f25-1fd3-1035-88de-6cf37c96799c', 'qwqw', '698d51a19d8a121ce581499d7b701668', '超t', 'jiang@test.com', null, null, '1', '1', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for au_user_menu_rel
-- ----------------------------
DROP TABLE IF EXISTS `au_user_menu_rel`;
CREATE TABLE `au_user_menu_rel` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `USER_ID` varchar(64) default NULL COMMENT '用户ID,外键',
  `MENU_ID` varchar(64) default NULL COMMENT '菜单ID,外键',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户菜单关系表';

-- ----------------------------
-- Records of au_user_menu_rel
-- ----------------------------
INSERT INTO `au_user_menu_rel` VALUES ('a2220ffd-50dc-1033-9b50-dac85d7535aa', '1e109fa2-50dc-1033-9b50-dac85d7535aa', '981e2771-b979-11e3-abbe-24b6fd43a047', '1', '0', '3', 'Admin', '2015-05-21 15:39:02', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('a2228692-50dc-1033-9b50-dac85d7535aa', '1e109fa2-50dc-1033-9b50-dac85d7535aa', '2ed0ab4d-b977-11e3-abbe-24b6fd43a047', '1', '0', '3', 'Admin', '2015-05-21 15:39:02', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff704cfa-b933-1032-acf3-2b1e150e0901', '3', '44d6cc36-b2fa-1032-8483-8970969f59e2', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff70eabc-b933-1032-acf3-2b1e150e0901', '3', '2623544c-153d-11e4-ab37-0997d771b126', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff71a756-b933-1032-acf3-2b1e150e0901', '3', '8bc54ad3-153d-11e4-ab37-0997d771b126', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff724b3f-b933-1032-acf3-2b1e150e0901', '3', '56e2d09b-625a-11e4-908c-0025645860c1', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff72e0a0-b933-1032-acf3-2b1e150e0901', '3', 'e8956332-0fec-11e4-ba9d-4ebbbd82541e', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff737a89-b933-1032-acf3-2b1e150e0901', '3', '03ee1da8-1251-11e4-ab05-0ad81e0fef82', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff744052-b933-1032-acf3-2b1e150e0901', '3', '18aad733-6698-1032-99ce-b7bd90984baf', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff74ef80-b933-1032-acf3-2b1e150e0901', '3', '924aec01-b932-1032-acf3-2b1e150e0901', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);
INSERT INTO `au_user_menu_rel` VALUES ('ff763417-b933-1032-acf3-2b1e150e0901', '3', '37ad2059-b624-11e3-bf47-24b6fd43a047', '1', '0', '3', 'Admin', '2014-11-09 15:41:29', null, null, null);

-- ----------------------------
-- Table structure for au_user_org_rel
-- ----------------------------
DROP TABLE IF EXISTS `au_user_org_rel`;
CREATE TABLE `au_user_org_rel` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `USER_ID` varchar(64) default NULL COMMENT '用户ID,外键',
  `ORG_ID` varchar(64) default NULL COMMENT '组织ID，外键',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户组织机构关系表';

-- ----------------------------
-- Records of au_user_org_rel
-- ----------------------------
INSERT INTO `au_user_org_rel` VALUES ('4152f6f8-50df-1033-9b50-dac85d7535aa', '1e109fa2-50dc-1033-9b50-dac85d7535aa', '100003', '1', '0', '3', 'Admin', '2015-05-21 15:57:48', null, null, null);
INSERT INTO `au_user_org_rel` VALUES ('41536715-50df-1033-9b50-dac85d7535aa', '1e109fa2-50dc-1033-9b50-dac85d7535aa', '100005', '1', '0', '3', 'Admin', '2015-05-21 15:57:48', null, null, null);

-- ----------------------------
-- Table structure for au_user_post_rel
-- ----------------------------
DROP TABLE IF EXISTS `au_user_post_rel`;
CREATE TABLE `au_user_post_rel` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `USER_ID` varchar(64) default NULL COMMENT '用户ID,外键',
  `POST_ID` varchar(64) default NULL COMMENT '岗位ID,外键',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户岗位关系表';

-- ----------------------------
-- Records of au_user_post_rel
-- ----------------------------
INSERT INTO `au_user_post_rel` VALUES ('14f000ae-50dd-1033-9b50-dac85d7535aa', '1e109fa2-50dc-1033-9b50-dac85d7535aa', '41e8b76b-0b79-1032-a33d-e4fe4a7a8220', '1', '0', '3', 'Admin', '2015-05-21 15:42:15', null, null, null);

-- ----------------------------
-- Table structure for au_user_role_rel
-- ----------------------------
DROP TABLE IF EXISTS `au_user_role_rel`;
CREATE TABLE `au_user_role_rel` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `USER_ID` varchar(64) default NULL COMMENT '用户ID,外键',
  `ROLE_ID` varchar(64) default NULL COMMENT '角色ID，外键',
  `IS_VALID` varchar(2) default NULL COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default NULL COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色关系表';

-- ----------------------------
-- Records of au_user_role_rel
-- ----------------------------
INSERT INTO `au_user_role_rel` VALUES ('1', '1', '100002', '1', '0', null, null, null, null, null, null);
INSERT INTO `au_user_role_rel` VALUES ('2', '2', 'de1280b4-b654-11e3-bf47-24b6fd43a047', '1', '0', null, null, null, null, null, null);
INSERT INTO `au_user_role_rel` VALUES ('3', '3', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '1', '0', null, null, null, null, null, null);
INSERT INTO `au_user_role_rel` VALUES ('c6223f59-50dc-1033-9b50-dac85d7535aa', '1e109fa2-50dc-1033-9b50-dac85d7535aa', 'bc107abe-b654-11e3-bf47-24b6fd43a047', '1', '0', '3', 'Admin', '2015-05-21 15:40:03', null, null, null);

-- ----------------------------
-- Table structure for bu_contactmethod
-- ----------------------------
DROP TABLE IF EXISTS `bu_contactmethod`;
CREATE TABLE `bu_contactmethod` (
  `ID` varchar(64) NOT NULL COMMENT '主键',
  `contactName` varchar(100) default NULL COMMENT '联系人名称',
  `department` varchar(100) default NULL COMMENT '部门',
  `mobile` varchar(20) default NULL COMMENT '手机号码',
  `email` varchar(255) default NULL COMMENT '邮箱',
  `wechat` varchar(50) NOT NULL COMMENT '微信',
  `remark` varchar(256) NOT NULL COMMENT '备注',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_contactmethod
-- ----------------------------
INSERT INTO `bu_contactmethod` VALUES ('9df724c9-ea2a-1032-b56b-1aa0d54d0224', '开发管理', 'cms', '18917212185', '38844067@qq.com', '18917212185', '开发人员');

-- ----------------------------
-- Table structure for bu_repository_connection
-- ----------------------------
DROP TABLE IF EXISTS `bu_repository_connection`;
CREATE TABLE `bu_repository_connection` (
  `ID` varchar(64) NOT NULL COMMENT '编号',
  `CONN_NAME` varchar(60) default NULL COMMENT '知识库名称',
  `DB_TYPE` varchar(60) default NULL COMMENT '知识库类型:oracle mysql',
  `CONN_IP` varchar(30) default NULL,
  `PORT` varchar(10) default NULL,
  `INST_TYPE` varchar(30) default NULL COMMENT 'oracle中 sid或者servername',
  `DB_USER` varchar(60) default NULL,
  `DB_PWD` varchar(60) default NULL,
  `CONN_URL` varchar(355) default NULL COMMENT '库url',
  `FROMDWID` varchar(64) default NULL COMMENT '同步自dw编号',
  `HASHS` varchar(100) default NULL COMMENT 'hash码',
  `ISCHANGED` tinyint(1) default '0' COMMENT '是否有变化:1有0无',
  `USENUM` int(11) default '0' COMMENT '引用次数',
  `IS_VALID` varchar(2) default '1' COMMENT '是否有效，1：有效；0：无效；',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据源';

-- ----------------------------
-- Records of bu_repository_connection
-- ----------------------------
INSERT INTO `bu_repository_connection` VALUES ('0fb247c0-aae0-1034-b6fe-2f2f5f4e6a2b', 'dsMysql_1', 'MySQL', null, null, null, 'root', 'root', 'jdbc:mysql://localhost:3305/dqcenter?useUnicode=true&characterEncoding=UTF-8', null, null, null, '6', '0');

-- ----------------------------
-- Table structure for bu_repository_infodw
-- ----------------------------
DROP TABLE IF EXISTS `bu_repository_infodw`;
CREATE TABLE `bu_repository_infodw` (
  `id` varchar(64) NOT NULL default '',
  `conn_name` varchar(60) default NULL COMMENT '知识库名称',
  `db_type` varchar(60) default NULL COMMENT '知识库类型:oracle mysql',
  `conn_ip` varchar(150) default NULL,
  `port` varchar(10) default NULL,
  `inst_type` varchar(30) default NULL COMMENT 'oracle中 sid或者servername',
  `db_user` varchar(60) default NULL,
  `db_pwd` varchar(60) default NULL,
  `serv_name` varchar(60) default NULL COMMENT '知识库名称',
  `serv_port` varchar(10) default NULL COMMENT '知识库服务端口',
  `serv_user` varchar(60) default NULL,
  `serv_pwd` varchar(60) default NULL,
  `conn_url` varchar(355) default NULL,
  `DEFAULT_Y` tinyint(1) default '0' COMMENT '是否默认dw',
  `issync` tinyint(1) default '0' COMMENT '是否已同步:1是0否',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_repository_infodw
-- ----------------------------
INSERT INTO `bu_repository_infodw` VALUES ('dc810f06-b2fb-1032-8483-8970969f59e2', 'datasource2', 'Oracle', null, null, null, 'etl_info9', '111111', 'wisdragon-00004', '7333', 'Administrator', 'Administrator', 'jdbc:oracle:thin:@wisdragon-00004:1521:orcl', '1', '1');

-- ----------------------------
-- Table structure for bu_scheduler
-- ----------------------------
DROP TABLE IF EXISTS `bu_scheduler`;
CREATE TABLE `bu_scheduler` (
  `ID` varchar(64) NOT NULL COMMENT '编号',
  `SUBJECT_ID` int(11) default NULL COMMENT '文件夹',
  `SCHEDULER_NAME` varchar(240) default NULL COMMENT '计划名称',
  `START_TIME` varchar(30) default NULL COMMENT '开始时间',
  `END_TIME` varchar(30) default NULL COMMENT '结束时间',
  `RUN_OPTIONS` int(11) default NULL COMMENT '运行方式',
  `END_OPTIONS` int(11) default NULL COMMENT '结束方式',
  `DELTA_VALUE` int(11) default NULL,
  `RUN_COUNT` int(11) default NULL COMMENT '运行次数',
  `COMMENTS` varchar(2000) default NULL,
  `IS_VISIBLE` int(11) default NULL,
  `RECNT_END_TIME` varchar(30) default NULL COMMENT '最近一次运行结束时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='定时任务';

-- ----------------------------
-- Records of bu_scheduler
-- ----------------------------

-- ----------------------------
-- Table structure for bu_schedule_logic
-- ----------------------------
DROP TABLE IF EXISTS `bu_schedule_logic`;
CREATE TABLE `bu_schedule_logic` (
  `id` varchar(64) NOT NULL,
  `scheduler_name` varchar(240) default NULL COMMENT '计划名称',
  `start_time` varchar(30) default NULL COMMENT '开始时间',
  `end_time` varchar(30) default NULL COMMENT '结束时间',
  `user_logic_type` int(11) default NULL COMMENT '类型，日，周，月对应于1,2,4',
  `frequency_intervl` int(11) default NULL COMMENT '间隔repeat every',
  `daily_logic` varchar(11) default NULL COMMENT '每天间隔时间',
  `weekly_logic` varchar(60) default NULL COMMENT '周的运行时间',
  `monthly_logic` varchar(200) default NULL COMMENT '月',
  `USENUM` int(11) default '0' COMMENT '引用次数',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_schedule_logic
-- ----------------------------
INSERT INTO `bu_schedule_logic` VALUES ('1', 'sch_test_001', '2016-11-12 00:01', '2017-03-16', '1', '0', '00:03', '', '', '1');
INSERT INTO `bu_schedule_logic` VALUES ('4f06c1c8-daf2-11e6-90ff-005056b37b72', 'ld_zwy_tixing', '2017-01-15 22:20', '2099-12-31', '1', '1', '24:00', '', '', '1');
INSERT INTO `bu_schedule_logic` VALUES ('d2be12eb-10ec-1035-9b79-8877b93d045e', 'sch_test_day_001', '2016-12-11 00:01', '2017-03-23', '1', '0', '00:01', '', '', '2');
INSERT INTO `bu_schedule_logic` VALUES ('f3f1f817-10ec-1035-9b79-8877b93d045e', 'sch_test_month_001', '2016-12-05 20:24', '2099-12-31', '4', '2', '01:00', '', 'mth07,mth14,mth22,mth23', null);

-- ----------------------------
-- Table structure for bu_validate_msg
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_msg`;
CREATE TABLE `bu_validate_msg` (
  `ID` varchar(64) NOT NULL COMMENT '编号',
  `SQL_ID` varchar(64) default NULL COMMENT '关联sql编号',
  `MSG_TYPE` int(11) default NULL COMMENT '-1,0失败,1成功',
  `MSG` varchar(5000) default NULL COMMENT '消息内容',
  `ISPUSH` varchar(1) default NULL COMMENT '是否推送:1推送0不推',
  `AFTOPT` varchar(2) default NULL COMMENT '标的后续动作',
  `selfopt` varchar(40) default '0' COMMENT '验证本身动作',
  `optids` varchar(5000) default '' COMMENT '标的列表',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='验证结果消息 成功 失败';

-- ----------------------------
-- Records of bu_validate_msg
-- ----------------------------
INSERT INTO `bu_validate_msg` VALUES ('2b703929-2c6b-1035-a8bd-e846a25adb3d', '8f7f2c8d-28b5-1035-a3f7-d677cfa8dc56', '0', 'err_sql', '1', '0', '4cc1e279-1092-1035-9b79-8877b93d045e', '');
INSERT INTO `bu_validate_msg` VALUES ('2b714bdf-2c6b-1035-a8bd-e846a25adb3d', '8f7f2c8d-28b5-1035-a3f7-d677cfa8dc56', '1', 'suc_sql', '1', '0', 'f01c0b20-0d0e-1035-ad00-fb97003b2a20', '');
INSERT INTO `bu_validate_msg` VALUES ('674b4197-3bf5-1035-8dda-7d3cb3d0f765', '181d9438-14f1-1035-bd51-40364de180de', '0', 'flow_test_001_错误', '1', '0', 'f01c0b20-0d0e-1035-ad00-fb97003b2a20', '');
INSERT INTO `bu_validate_msg` VALUES ('674c80c1-3bf5-1035-8dda-7d3cb3d0f765', '181d9438-14f1-1035-bd51-40364de180de', '1', 'suc', '1', '4', 'f01c0b20-0d0e-1035-ad00-fb97003b2a20', '[{\"id\":\"11\",\"type\":\"71\",\"name\":\"wk_loadStage_channel2\"}]');
INSERT INTO `bu_validate_msg` VALUES ('8191aa27-2c7e-1035-a8bd-e846a25adb3d', '04eba3a7-dfb0-1032-aa89-202e871cf783', '0', '001失败', '1', '0', 'f01c0b20-0d0e-1035-ad00-fb97003b2a20', '');
INSERT INTO `bu_validate_msg` VALUES ('8192b463-2c7e-1035-a8bd-e846a25adb3d', '04eba3a7-dfb0-1032-aa89-202e871cf783', '1', '001成功了', '0', '0', '4db8c9be-1092-1035-9b79-8877b93d045e', '');
INSERT INTO `bu_validate_msg` VALUES ('b9808d2f-2af5-1035-9f4a-c3e639675a8f', '12036c8d-143c-1035-9759-a629dbd08011', '0', '台式机_error', '1', '0', '4db8c9be-1092-1035-9b79-8877b93d045e', '');
INSERT INTO `bu_validate_msg` VALUES ('b9812d55-2af5-1035-9f4a-c3e639675a8f', '12036c8d-143c-1035-9759-a629dbd08011', '1', 'sr', '0', '0', 'f01c0b20-0d0e-1035-ad00-fb97003b2a20', '');

-- ----------------------------
-- Table structure for bu_validate_msg_senddetail
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_msg_senddetail`;
CREATE TABLE `bu_validate_msg_senddetail` (
  `id` varchar(64) default NULL,
  `sql_id` varchar(64) default NULL COMMENT 'sql的id',
  `rusult_id` varchar(64) default NULL,
  `validate_name` varchar(500) default NULL COMMENT '校验名称，便于以后信息接收人的识别',
  `validate_time` datetime default NULL COMMENT '校验开始时间',
  `validate_time_end` datetime default NULL COMMENT '验证结束时间',
  `send_time` datetime default NULL COMMENT '消息发送时间',
  `msg_type` int(11) default NULL COMMENT '-1,0,1',
  `msg` varchar(5000) default NULL COMMENT '消息内容',
  `receive_id` varchar(64) default NULL COMMENT '消息接收人id',
  `receive_type` varchar(30) default NULL COMMENT '接受方式:1,邮件；2短信',
  `contactName` varchar(100) default NULL COMMENT '联系人名称',
  `department` varchar(100) default NULL COMMENT '部门',
  `mobile` varchar(20) default NULL COMMENT '手机号码',
  `email` varchar(50) default NULL COMMENT '邮箱'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_validate_msg_senddetail
-- ----------------------------

-- ----------------------------
-- Table structure for bu_validate_msg_sendlog
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_msg_sendlog`;
CREATE TABLE `bu_validate_msg_sendlog` (
  `id` varchar(64) default NULL,
  `sql_id` varchar(64) default NULL COMMENT 'sql的id',
  `rusult_id` varchar(64) default NULL,
  `validate_name` varchar(500) default NULL COMMENT '校验名称，便于以后信息接收人的识别',
  `validate_time` datetime default NULL COMMENT '校验开始时间',
  `validate_time_end` datetime default NULL COMMENT '验证结束时间',
  `send_time` datetime default NULL COMMENT '消息发送时间',
  `msg_type` int(11) default NULL COMMENT '-1,0,1',
  `msg` varchar(5000) default NULL COMMENT '消息内容',
  `receive_id` varchar(64) default NULL COMMENT '消息接收人id',
  `receive_type` varchar(30) default NULL COMMENT '接受方式:1,邮件；2短信',
  `contactName` varchar(100) default NULL COMMENT '联系人名称',
  `department` varchar(100) default NULL COMMENT '部门',
  `mobile` varchar(20) default NULL COMMENT '手机号码',
  `email` varchar(50) default NULL COMMENT '邮箱',
  KEY `sendlog` (`rusult_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_validate_msg_sendlog
-- ----------------------------

-- ----------------------------
-- Table structure for bu_validate_msg_sendto
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_msg_sendto`;
CREATE TABLE `bu_validate_msg_sendto` (
  `id` varchar(64) default NULL COMMENT 'id',
  `sql_id` varchar(64) default NULL COMMENT '校验名称，便于以后信息接收人的识别',
  `receive_id` varchar(64) default NULL COMMENT '消息接收人id',
  `receive_type` varchar(30) default NULL COMMENT '接受方式:',
  KEY `id` (`id`),
  KEY `sendto_sql_id` (`sql_id`),
  CONSTRAINT `sendto_sql_id` FOREIGN KEY (`sql_id`) REFERENCES `bu_validate_sql` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_validate_msg_sendto
-- ----------------------------
INSERT INTO `bu_validate_msg_sendto` VALUES ('b98251e5-2af5-1035-9f4a-c3e639675a8f', '12036c8d-143c-1035-9759-a629dbd08011', '9df724c9-ea2a-1032-b56b-1aa0d54d0224', '010');
INSERT INTO `bu_validate_msg_sendto` VALUES ('2b728960-2c6b-1035-a8bd-e846a25adb3d', '8f7f2c8d-28b5-1035-a3f7-d677cfa8dc56', '9df724c9-ea2a-1032-b56b-1aa0d54d0224', '010');
INSERT INTO `bu_validate_msg_sendto` VALUES ('8193fe98-2c7e-1035-a8bd-e846a25adb3d', '04eba3a7-dfb0-1032-aa89-202e871cf783', '9df724c9-ea2a-1032-b56b-1aa0d54d0224', '010');
INSERT INTO `bu_validate_msg_sendto` VALUES ('674e0f6c-3bf5-1035-8dda-7d3cb3d0f765', '181d9438-14f1-1035-bd51-40364de180de', '9df724c9-ea2a-1032-b56b-1aa0d54d0224', '010');

-- ----------------------------
-- Table structure for bu_validate_opts
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_opts`;
CREATE TABLE `bu_validate_opts` (
  `ID` varchar(64) NOT NULL COMMENT '编号',
  `OPTNAME` varchar(100) default NULL COMMENT '动作名称',
  `OPTTYPE` varchar(40) default '0' COMMENT '动作类型:0无操作1重复',
  `ALTONTIMES` int(11) default NULL COMMENT '第几次时提示',
  `REPETTIMES` int(11) default '0' COMMENT '尝试次数',
  `TIMEINTERVAL` int(11) default '0' COMMENT '间隔秒数',
  `ISIMMEDIATELY` varchar(2) default '0' COMMENT '是否即时执行:1是0否',
  `ISDOUBLE` varchar(2) default '0' COMMENT '时间是否翻倍',
  `AFTEROPT` varchar(40) default '0' COMMENT '动作:0无操作1正确则回归2全错停止',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  `IS_VALID` varchar(2) default '1' COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default '0' COMMENT '是否删除，0：有效；1：删除；',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='验证self动作';

-- ----------------------------
-- Records of bu_validate_opts
-- ----------------------------
INSERT INTO `bu_validate_opts` VALUES ('47b38cf2-1092-1035-9b79-8877b93d045e', '预留16', '1', null, '3', '30', '0', '1', '2', null, null, null, null, null, null, '0', null);
INSERT INTO `bu_validate_opts` VALUES ('48c72567-1092-1035-9b79-8877b93d045e', '预留15', '1', null, '3', '30', '0', '1', '2', null, null, null, null, null, null, '0', null);
INSERT INTO `bu_validate_opts` VALUES ('49589b9c-1092-1035-9b79-8877b93d045e', '预留14', '1', null, '3', '30', '0', '1', '2', null, null, null, null, null, null, '0', null);
INSERT INTO `bu_validate_opts` VALUES ('49f3021f-1092-1035-9b79-8877b93d045e', '预留13', '1', null, '3', '30', '0', '1', '2', null, null, null, null, null, null, '0', null);
INSERT INTO `bu_validate_opts` VALUES ('4a8534b0-1092-1035-9b79-8877b93d045e', '预留12', '1', null, '3', '30', '0', '1', '2', null, null, null, null, null, null, '0', null);
INSERT INTO `bu_validate_opts` VALUES ('4b3364fb-1092-1035-9b79-8877b93d045e', '预留11', '1', null, '3', '30', '0', '1', '2', null, null, null, null, null, null, '0', null);
INSERT INTO `bu_validate_opts` VALUES ('4cc1e279-1092-1035-9b79-8877b93d045e', '重复5/5次', '2', '5', '5', '300', '0', '0', '2', null, null, null, null, null, null, '1', '0');
INSERT INTO `bu_validate_opts` VALUES ('4db8c9be-1092-1035-9b79-8877b93d045e', '重复2/3次', '1', '2', '3', '300', '0', '0', '2', null, null, null, null, null, null, '1', '0');
INSERT INTO `bu_validate_opts` VALUES ('6127bbed-0d0f-1035-ad00-fb97003b2a20', '立即', '0', null, '1', '0', '0', '1', '2', null, null, null, null, null, null, '1', '0');
INSERT INTO `bu_validate_opts` VALUES ('f01c0b20-0d0e-1035-ad00-fb97003b2a20', '无', '0', null, '0', '0', '0', '1', '2', null, null, null, null, null, null, '1', '0');

-- ----------------------------
-- Table structure for bu_validate_result
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_result`;
CREATE TABLE `bu_validate_result` (
  `id` varchar(64) NOT NULL default '' COMMENT 'id',
  `validate_time` datetime default NULL COMMENT '校验时间',
  `sql_id` varchar(64) default NULL COMMENT 'sql的id',
  `validate_name` varchar(500) default NULL COMMENT '校验名称，便于以后信息接收人的识别',
  `msg_id` varchar(64) default NULL COMMENT 'msg的id',
  `msg` text COMMENT '消息内容',
  `send_flag` int(1) default NULL COMMENT '消息是否发送标识',
  `send_time` datetime default NULL COMMENT '消息发送时间',
  `rec_id` varchar(64) default NULL COMMENT '接收人id',
  `rec_type` int(11) default NULL COMMENT '短信或者邮件',
  `rec_contact` varchar(5000) default NULL COMMENT '联系人：联系方式内容，手机号码或者邮件地址',
  `msg_type_id` varchar(40) default NULL COMMENT '验证结果:-3,-2,-1,0,1',
  `validate_time_end` datetime default NULL COMMENT '验证结果时间',
  PRIMARY KEY  (`id`),
  KEY `id` (`id`),
  KEY `result_sql_id` (`sql_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_validate_result
-- ----------------------------
INSERT INTO `bu_validate_result` VALUES ('3eb7273f-a3d7-45b0-9c8f-7cb1cd2a3a6c', '2017-03-19 22:29:00', '181d9438-14f1-1035-bd51-40364de180de', 'flow_test_001', null, null, null, null, null, null, null, '0', '2017-03-19 22:29:00');

-- ----------------------------
-- Table structure for bu_validate_result_log
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_result_log`;
CREATE TABLE `bu_validate_result_log` (
  `id` varchar(36) NOT NULL,
  `validate_time` varchar(19) default NULL,
  `Validate_Time_End` varchar(19) default NULL,
  `sql_id` varchar(64) default NULL,
  `validate_name` varchar(200) default NULL,
  `msg_type_id` varchar(40) default NULL COMMENT '执行结果:-10,-2,-3,-1,0,1',
  `rs_type` int(11) default '0' COMMENT '结果类型:0,1 对应bu_validate_msg ',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_validate_result_log
-- ----------------------------

-- ----------------------------
-- Table structure for bu_validate_sql
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_sql`;
CREATE TABLE `bu_validate_sql` (
  `id` varchar(64) NOT NULL default '' COMMENT 'id',
  `validate_name` varchar(500) default NULL COMMENT '校验名称，便于以后信息接收人的识别',
  `sql_content` text COMMENT 'sql内容',
  `trigger_type` varchar(10) default NULL COMMENT '触发方式：schedule或者是紧随指定的节点',
  `trigger_id` varchar(64) default NULL,
  `conn_id` varchar(36) default NULL COMMENT '数据源id',
  `enabled` tinyint(1) default '1' COMMENT '是否可用 1可用0不可用',
  `repst_conn_id` varchar(64) default NULL COMMENT '所属存储库id',
  `remark` varchar(255) default NULL COMMENT '描述',
  PRIMARY KEY  (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bu_validate_sql
-- ----------------------------
INSERT INTO `bu_validate_sql` VALUES ('04eba3a7-dfb0-1032-aa89-202e871cf783', 'valid_test_001', 'select DATE_FORMAT(\'2016-12-10 10:12:20.0\', \'%Y-%m-%d\')>2   from dual', '0', 'd2be12eb-10ec-1035-9b79-8877b93d045e', '0fb247c0-aae0-1034-b6fe-2f2f5f4e6a2b', '0', 'dc810f06-b2fb-1032-8483-8970969f59e2', 'sch_test_day_001');
INSERT INTO `bu_validate_sql` VALUES ('12036c8d-143c-1035-9759-a629dbd08011', 'ttset', 'select DATE_FORMAT(\'#{var_tt3}\', \'%Y-%m-%d\')<2   from dual', '0', 'd2be12eb-10ec-1035-9b79-8877b93d045e', '0fb247c0-aae0-1034-b6fe-2f2f5f4e6a2b', '0', 'dc810f06-b2fb-1032-8483-8970969f59e2', 'sch_test_day_001');
INSERT INTO `bu_validate_sql` VALUES ('181d9438-14f1-1035-bd51-40364de180de', 'flow_test_001', 'select DATE_FORMAT(\'2016-12-10 10:12:20.0\', \'%Y-%m-%d\')<2   from dual', '1', 'i_11', '0fb247c0-aae0-1034-b6fe-2f2f5f4e6a2b', '1', 'dc810f06-b2fb-1032-8483-8970969f59e2', 's_DW_STAGE_S_CONTACT');
INSERT INTO `bu_validate_sql` VALUES ('58', 'Command', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('59', 'Decision', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('65', 'Email', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('66', 'Timer', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('67', 'Assignment', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('68', 'Session', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('70', 'Worklet', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('71', 'Workflow', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('8f7f2c8d-28b5-1035-a3f7-d677cfa8dc56', 'val_sql', 'select is_del>0 from t_flow where flow_id=22', '0', '4f06c1c8-daf2-11e6-90ff-005056b37b72', '0fb247c0-aae0-1034-b6fe-2f2f5f4e6a2b', '0', 'dc810f06-b2fb-1032-8483-8970969f59e2', 'ld_zwy_tixing');
INSERT INTO `bu_validate_sql` VALUES ('91', 'Control', 'SELECT * FROM (\r\nselect a.subject_id,\r\n                       a.workflow_id,\r\n                       a.workflow_run_id,\r\n                       a.worklet_run_id,\r\n                       a.child_run_id,\r\n                       a.instance_id,                  \r\n                       a.instance_name,\r\n                       a.task_id,\r\n                       a.task_type,\r\n                       a.start_time StartTime,\r\n                       a.end_time EndTime,\r\n                       a.run_err_code ErrorCode,\r\n                       convert( a.run_err_msg, \'ZHS16GBK\', \'UTF8\') ErrorMsg, \r\n                       a.run_status_code Status,\r\n                       b.src_success_rows SrcSuccessRows,\r\n                       b.src_failed_rows SrcFailedRows,\r\n                       b.targ_success_rows TgtSuccessRows,\r\n                       b.targ_failed_rows TgtFailedRows,               \r\n                       b.total_trans_errs TotalTransErrors,\r\n                       b.first_error_code FirstErrorCode,                       \r\n                       convert(  b.first_error_msg, \'ZHS16GBK\', \'UTF8\') FirstErrorMsg, \r\n                       rank() over(partition by a.subject_id, a.workflow_id, a.instance_id, to_char(a.end_time, \'yyyyMMdd\') order by a.end_time desc) as sortnum\r\n                  from opb_task_inst_run a, OPB_SESS_TASK_LOG b\r\n                 where a.workflow_id = b.workflow_id\r\n                   and a.workflow_run_id = b.workflow_run_id\r\n                   and a.instance_id = b.instance_id\r\n                   and to_char(a.end_time,\'yyyyMMdd\') = TO_CHAR( SYSDATE,\'yyyyMMdd\')  AND a.instance_id=', '3', null, null, '1', null, '会话');
INSERT INTO `bu_validate_sql` VALUES ('94fa3e30-da2f-1032-9a10-dd551360a92e', 'para_test002', 'select current_timestamp as sqlNamett3, current_timestamp as tt6 ,current_timestamp as ccr\n					', '2', null, '0fb247c0-aae0-1034-b6fe-2f2f5f4e6a2b', '1', null, null);
INSERT INTO `bu_validate_sql` VALUES ('ac643188-ea8d-1032-bc0c-641127916134', 'xcxc22', 'select \'bbbc\' cx from dual', '2', null, '2b516976-b2fc-1032-8483-8970969f59e2', '1', null, null);
INSERT INTO `bu_validate_sql` VALUES ('c630f56e-131d-1035-a7ba-e843972e1d09', 'pa_002', 'select current_timestamp as sqlNamett4 ', '2', null, '0fb247c0-aae0-1034-b6fe-2f2f5f4e6a2b', '0', null, null);

-- ----------------------------
-- Table structure for bu_validate_sql_var
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_sql_var`;
CREATE TABLE `bu_validate_sql_var` (
  `ID` varchar(64) NOT NULL COMMENT '编号',
  `SQL_ID` varchar(64) default NULL,
  `VAR_NAME` varchar(500) default NULL COMMENT '变量名称',
  `VAR_VALUE` varchar(255) default NULL COMMENT '参考值',
  `sql_name` varchar(1000) default NULL COMMENT 'sql字段名',
  `USENUM` int(11) default '0' COMMENT '引用次数',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='验证参数变量';

-- ----------------------------
-- Records of bu_validate_sql_var
-- ----------------------------
INSERT INTO `bu_validate_sql_var` VALUES ('0ac973c6-14fc-1035-bd51-40364de180de', '68', 's_DW_STAGE_S_CONTACT.ErrorCode.1481905358299', '6,dc810f06-b2fb-1032-8483-8970969f59e2', 'ErrorCode', '1');
INSERT INTO `bu_validate_sql_var` VALUES ('8e0b2440-2af5-1035-9f4a-c3e639675a8f', '94fa3e30-da2f-1032-9a10-dd551360a92e', 'tt6', '2017-01-13 23:31:32.0', 'tt6', '0');
INSERT INTO `bu_validate_sql_var` VALUES ('8e0c668f-2af5-1035-9f4a-c3e639675a8f', '94fa3e30-da2f-1032-9a10-dd551360a92e', 'var_tt3', '2017-01-13 23:31:32.0', 'sqlNamett3', '0');
INSERT INTO `bu_validate_sql_var` VALUES ('8e0d1682-2af5-1035-9f4a-c3e639675a8f', '94fa3e30-da2f-1032-9a10-dd551360a92e', 'var_tt7', '2017-01-13 23:31:32.0', 'ccr', '0');
INSERT INTO `bu_validate_sql_var` VALUES ('9408e6f1-2af5-1035-9f4a-c3e639675a8f', 'c630f56e-131d-1035-a7ba-e843972e1d09', 'var001', '2017-01-13 23:31:46.0', 'sqlNamett4', '0');
INSERT INTO `bu_validate_sql_var` VALUES ('a7891ff4-14fe-1035-bd51-40364de180de', '68', 's_DW_STAGE_S_CONTACT.TgtFailedRows.1481906480311', '6,dc810f06-b2fb-1032-8483-8970969f59e2', 'TgtFailedRows', null);
INSERT INTO `bu_validate_sql_var` VALUES ('c23aaf30-0fd1-1035-9b79-8877b93d045e', 'ac643188-ea8d-1032-bc0c-641127916134', 'cxt', 'bbbc', 'cx', '0');
INSERT INTO `bu_validate_sql_var` VALUES ('da399cf2-0acb-1035-8904-fdf8e182e5f4', '68', 's_DW_ODS_CRM_S_PROD_INT.EndTime.16120323594012', '3200,dc810f06-b2fb-1032-8483-8970969f59e2', 'EndTime', '1');
INSERT INTO `bu_validate_sql_var` VALUES ('fa6cb6ed-14fd-1035-bd51-40364de180de', '68', 's_DW_STAGE_S_CONTACT.TgtFailedRows.1481906189849', '6,dc810f06-b2fb-1032-8483-8970969f59e2', 'TgtFailedRows', null);

-- ----------------------------
-- Table structure for bu_validate_targets
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_targets`;
CREATE TABLE `bu_validate_targets` (
  `ID` varchar(64) NOT NULL COMMENT 'id',
  `VCONFID` varchar(64) default NULL COMMENT '推送批次confid',
  `TTYPE` varchar(1) default NULL COMMENT '目标类型:w工作流i节点',
  `TARGETID` int(11) default NULL COMMENT '目标id',
  `TARGETNAME` varchar(200) default NULL COMMENT '目标名称',
  `NODETYPE` varchar(64) default NULL COMMENT '节点类型：71、70、68等',
  `PPATHVAL` varchar(200) default NULL COMMENT '名称路径',
  `WFID` int(11) default NULL COMMENT '工作流id',
  `IS_VALID` varchar(2) default '1' COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default '0' COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='发送目标';

-- ----------------------------
-- Records of bu_validate_targets
-- ----------------------------

-- ----------------------------
-- Table structure for bu_validate_targets_conf
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_targets_conf`;
CREATE TABLE `bu_validate_targets_conf` (
  `ID` varchar(64) NOT NULL COMMENT 'id',
  `TSNAME` varchar(200) default NULL COMMENT '配置名称',
  `FIRSTNUM` int(11) default NULL COMMENT '首次num',
  `FIRSTOPT` varchar(64) default NULL COMMENT '首次动作',
  `NEXTNUM` int(11) default NULL COMMENT '下次num',
  `NEXTOPT` varchar(64) default NULL COMMENT '下次动作',
  `REPST_CONN_ID` varchar(36) default NULL COMMENT '跟随验证引用的info存储库id',
  `IS_VALID` varchar(2) default '1' COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default '0' COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='发送设置';

-- ----------------------------
-- Records of bu_validate_targets_conf
-- ----------------------------

-- ----------------------------
-- Table structure for bu_validate_targets_recei
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_targets_recei`;
CREATE TABLE `bu_validate_targets_recei` (
  `ID` varchar(64) NOT NULL COMMENT 'id',
  `VCONFID` varchar(64) default NULL COMMENT 'id',
  `RECEIVE_ID` varchar(64) default NULL COMMENT '编号',
  `IS_VALID` varchar(2) default '1' COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default '0' COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='接收目标';

-- ----------------------------
-- Records of bu_validate_targets_recei
-- ----------------------------
INSERT INTO `bu_validate_targets_recei` VALUES ('7b1126f0-4f25-1035-bb04-3177c164b046', '4c68ef59-4f16-1035-bb04-3177c164b046', '9df724c9-ea2a-1032-b56b-1aa0d54d0224', '1', '0', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for bu_validate_targetv
-- ----------------------------
DROP TABLE IF EXISTS `bu_validate_targetv`;
CREATE TABLE `bu_validate_targetv` (
  `ID` varchar(64) NOT NULL COMMENT 'id',
  `TTYPE` varchar(1) default NULL COMMENT '目标类型:1工作流2节点',
  `TARGETID` int(11) default NULL COMMENT '目标id',
  `TARGETNAME` varchar(200) default NULL COMMENT '目标名称',
  `WFID` int(11) default NULL COMMENT '工作流id',
  `PPATHVAL` varchar(500) default NULL COMMENT '名称路径',
  `NODETYPE` varchar(64) default NULL COMMENT '节点类型：71、70、68等',
  `STARTTIMES` int(11) default NULL COMMENT '重试次数',
  `REPST_CONN_ID` varchar(36) default NULL COMMENT '跟随验证引用的info存储库id',
  `IS_VALID` varchar(2) default '1' COMMENT '是否有效，1：有效；0：无效；',
  `IS_DEL` varchar(2) default '0' COMMENT '是否删除，0：有效；1：删除；',
  `CREATE_USER_ID` varchar(64) default NULL COMMENT '创建人ID',
  `CREATE_USER_NAME` varchar(256) default NULL COMMENT '创建人姓名',
  `CREATE_DATE` datetime default NULL COMMENT '创建时间',
  `LAST_UPDATE_USER_ID` varchar(64) default NULL COMMENT '修改人ID',
  `LAST_UPDATE_USER_NAME` varchar(256) default NULL COMMENT '修改人姓名',
  `LAST_UPDATE_DATE` datetime default NULL COMMENT '修改时间',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='验证目标';

-- ----------------------------
-- Records of bu_validate_targetv
-- ----------------------------

-- ----------------------------
-- View structure for v_conn_list
-- ----------------------------
DROP VIEW IF EXISTS `v_conn_list`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER  VIEW `v_conn_list` AS SELECT 
        `bu_repository_infodw`.`id` AS `id`,
        concat('rp_',`bu_repository_infodw`.`conn_name`) AS `conn_name`,
        _UTF8'1' AS `ctype`
    FROM
        `bu_repository_infodw` 
    UNION SELECT 
        `bu_repository_connection`.`id` AS `id`,
        `bu_repository_connection`.`conn_name` AS `conn_name`,
        _UTF8'2' AS `ctype`
    FROM
        `bu_repository_connection` ;

-- ----------------------------
-- View structure for v_tree_validvar
-- ----------------------------
DROP VIEW IF EXISTS `v_tree_validvar`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER  VIEW `v_tree_validvar` AS select distinct b.id,'' as parent, b.validate_name as text, 1 as level, b.id as code, b.validate_name as value, 1 as haschild from bu_validate_sql b, bu_validate_sql_var c 
where b.trigger_type=2 and b.id=c.SQL_ID 
union 
select sv.id ,sv.SQL_ID as parent , CONCAT(sv.var_name,'(', sv.var_value,')') as text, 2 as level, sv.id as code, sv.var_name as value ,0 as haschild 
from bu_validate_sql_var sv JOIN bu_validate_sql s on s.id=sv.SQL_ID and s.trigger_type=2 ;
