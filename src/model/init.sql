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
