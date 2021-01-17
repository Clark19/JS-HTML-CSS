FROM node:12

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

# 앱이 8080 바인딩 되어 있으므로 EXPOSE 지시어를 사용해서 docker 데몬에 매핑합니다
EXPOSE 8080

# 마지막으로 런타임을 정의하는 CMD로 앱을 실행하는 중요 명령어를 정의해야 합니다. 여기서는 서버를 구동하도록 node server.js을 실행하는 기본 npm start을 사용할 것입니다.
CMD [ "node", "server.js" ]