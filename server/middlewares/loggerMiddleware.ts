export const requsetLoggerMiddleware = (req: any, res: any, next: any) => {
  console.log(`Method : ${req.method}, Path : ${req.path}, Body : ${JSON.stringify(req.body)}`);
  next();
};
