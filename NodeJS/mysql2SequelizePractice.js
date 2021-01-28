/* sequelize v4 방식 코드(구식 코드, v6부턴 이형식 사용시 에런가 경고 뜸.)
   version 6부턴 MySQL 5.6 지원 안 함. 5.7 써야 함.
  
  로컬 Docker에 설치된 MySQL과 연결하기 위해 포트 변경.
  sequelize 버전 4로 다운그레이드(책의 소소코드가 돌아가게 하기 위해)
   
*/
const Sequelize = require("sequelize");
const db = "boards";
const user = "study";
const password = "study";
const options = { host: "127.0.0.1", port: 3307, dialect: "mysql" };

let sequelize = new Sequelize(db, user, password, options);

const users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER(11),
      defaultValue: 25,
    },
  },
  {
    // classMethods: {},
    tableName: "users",
    freezeTableName: false,
    timestamps: false,
  }
);

/* Promise 형태롤 이용하는 방법
  sequelize.sync() 는 sequelize가 초기화될 때 DB에 필요한 테이블을 생성하는 함수.
*/
// sequelize
//   .sync()
//   .then(() =>
//     users.create({
//       id: 0,
//       name: "jin",
//       age: 20,
//     })
//   )
//   .then((data) => {
//     console.log(data.toJSON());
//     users.findAll({ raw: true }).then((result) => {
//       console.log(result);
//     });
//   });

/* async/await 로 이용하는 방식
 */
const dbExe = async () => {
  try {
    await sequelize.sync();
    users.create({
      id: 0,
      name: "jin",
      age: 20,
    });
  } catch (error) {
    console.log("에러:" + error);
    return;
  }
  console.log("db 초기화 완료");

  users.findAll({ raw: true }).then((result) => {
    console.log(result);
  });
};
dbExe();
