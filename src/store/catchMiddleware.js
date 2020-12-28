export default () => next => action => {
  return Promise.resolve(next(action)).catch(e => {
    // 公共错误处理
    console.error(e.message);
    // 将错误向上抛出，给外层使用
    throw e;
  });
};
