--20150215 21:39
--基本信息表：
CREATE TABLE t_jbxx_jbxx(
wid VARCHAR2(40) NOT NULL,
userid VARCHAR2(40),
xm VARCHAR2(40),
lb VARCHAR2(40)
)
--添加密码字段
ALTER TABLE t_jbxx_jbxx ADD(PASSWORD VARCHAR2(40))

--20150217 16:34
--采购方式维护
create table T_CGZXT_CGFSWH
(
  wid  VARCHAR2(40) not null,
  bm   VARCHAR2(40),
  mc   VARCHAR2(100)
)

--20150218 12:41
--申购部门
CREATE TABLE t_zxbz_dw(
WID VARCHAR2(40) NOT NULL,
dwdm VARCHAR2(40),
dwbzmc VARCHAR2(40)
)

--20150218 12:41
--使用校区
CREATE TABLE T_CGZXT_XQZDSJWH(
WID VARCHAR2(40) NOT NULL,
XQBM VARCHAR2(40),
XQMC VARCHAR2(40)      
)

--20150310 11:14
--申购编号递增序列
create sequence seq_sgbh
increment by 1
start with 1
minvalue 1 nomaxvalue
nocycle
--创建触发器
CREATE OR REPLACE TRIGGER tr_seq_ssgbh
  BEFORE INSERT ON T_CGZXT_CGSQB
FOR EACH ROW
BEGIN
  SELECT
     'A'||to_char(sysdate,'yyyy-mm-dd')  ||'_'||  TRIM(TO_CHAR(seq_sgbh.nextval, '000')) INTO :new.SGBH
  FROM
    dual;
END;
--创建用户与用户组的对应表
create table T_SYS_U2UG
(
  wid      VARCHAR2(40) not null,
  ugroupid VARCHAR2(40) not null,
  userid   VARCHAR2(40) not null,
  name     VARCHAR2(300)
)
--创建用户组表
T_SYS_UGROUP_SW

--20150418 16:09
create table T_GGGL_SPJLB
(
  wid    VARCHAR2(40) not null,
  shr    VARCHAR2(40), 
  shsj   VARCHAR2(40),
  shyj   VARCHAR2(300),
  zb_wid VARCHAR2(40),
  spjg   VARCHAR2(100),
  spjs   VARCHAR2(40)
)


--创建建模表
CREATE TABLE mod_bizobj(
ename VARCHAR2(100) NOT NULL,
cname VARCHAR2(100)
)
