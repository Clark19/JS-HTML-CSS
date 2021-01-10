/* 'production' 빌드 인경우 플러그인 적용 */
module.exports = {
  presets: ['@babel/preset-env'],
  plugins:
    process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
};
