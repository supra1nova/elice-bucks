function adminRequired(req, res, next) {
  
  if (req.user.role !== "admin-user") {
    res.status(401).json({
      result: 'forbidden-approach',
      reason: '관리자만 접근 가능한 서비스입니다.',
    });
    return;
  }
  
  next();
  return;
};

export { adminRequired };