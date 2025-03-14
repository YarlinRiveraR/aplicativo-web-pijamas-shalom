<?php include_once 'Views/template/header-secundario.php'; ?>
<div class="container mt-5">
  <h1 class="mb-4"><?php echo $data['title']; ?></h1>
  <?php if(isset($data['error'])): ?>
    <div class="alert alert-danger"><?php echo $data['error']; ?></div>
  <?php endif; ?>
  <form method="post" action="<?php echo BASE_URL . 'clientes/resetPassword/' . $data['token']; ?>">
    <div class="form-group">
      <label for="new_password">Nueva Contraseña</label>
      <input type="password" id="new_password" name="new_password" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="confirm_password">Confirmar Nueva Contraseña</label>
      <input type="password" id="confirm_password" name="confirm_password" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary btn-block">Restablecer Contraseña</button>
  </form>
</div>
<?php include_once 'Views/template/footer-secundario.php'; ?>
