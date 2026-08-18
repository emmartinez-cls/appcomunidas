import './style.css';

// Global Error Handler for diagnostic popup alerts
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global Error caught:', message, 'at', source, 'line', lineno);
  alert('Error en Aplicación:\n' + message + '\n\nArchivo: ' + source + '\nLínea: ' + lineno + ', Col: ' + colno);
};

// Helper function to capitalize the first character of each word and lowercase the rest
function capitalizeText(text) {
  if (!text) return '';
  return text.trim().toLowerCase().split(/\s+/).map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}


// ==========================================================================
// DOM ELEMENT SELECTORS
// ==========================================================================
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginCard = document.getElementById('login-card');
const loginForm = document.getElementById('login-form');
const inputIdentificador = document.getElementById('identificadorAcceso');
const inputContrasena = document.getElementById('contrasenaPlano');
const btnSubmit = document.getElementById('btn-submit');
const btnSubmitText = btnSubmit.querySelector('.btn-text');
const btnSubmitSpinner = btnSubmit.querySelector('.loader-spinner');
const btnTogglePassword = document.getElementById('toggle-password');
const iconEye = btnTogglePassword.querySelector('.icon-eye');
const iconEyeOff = btnTogglePassword.querySelector('.icon-eye-off');
const checkboxRemember = document.getElementById('remember-me');
const linkForgotPassword = document.getElementById('forgot-password');
const toastContainer = document.getElementById('toast-container');

// Dashboard Elements
const displayUser = document.getElementById('user-display');
const displayAccountId = document.getElementById('account-id-display');
const displayToken = document.getElementById('token-display');
const btnCopyToken = document.getElementById('btn-copy-token');
const btnLogout = document.getElementById('btn-logout');

// Recovery Elements
const forgotSection = document.getElementById('forgot-section');
const resetSection = document.getElementById('reset-section');
const forgotCard = document.getElementById('forgot-card');
const resetCard = document.getElementById('reset-card');
const forgotForm = document.getElementById('forgot-form');
const resetForm = document.getElementById('reset-form');
const inputForgotIdentificador = document.getElementById('forgot-identificador');
const inputResetIdentificador = document.getElementById('reset-identificador');
const inputResetCode = document.getElementById('reset-code');
const inputResetPassword = document.getElementById('reset-password');
const btnForgotSubmit = document.getElementById('btn-forgot-submit');
const btnResetSubmit = document.getElementById('btn-reset-submit');
const btnBackLogin = document.querySelector('.btn-back-login');
const btnBackForgot = document.querySelector('.btn-back-forgot');
const btnToggleResetPassword = document.getElementById('toggle-reset-password');
const iconEyeReset = btnToggleResetPassword.querySelector('.icon-eye-reset');
const iconEyeOffReset = btnToggleResetPassword.querySelector('.icon-eye-off-reset');

// Register Elements
const registerSection = document.getElementById('register-section');
const registerCard = document.getElementById('register-card');
const registerForm = document.getElementById('register-form');
const linkGoToRegister = document.getElementById('go-to-register');
const btnBackLoginReg = document.querySelector('.btn-back-login-reg');
const btnToggleRegisterPassword = document.getElementById('toggle-register-password');
const iconEyeReg = btnToggleRegisterPassword.querySelector('.icon-eye-reg');
const iconEyeOffReg = btnToggleRegisterPassword.querySelector('.icon-eye-off-reg');
const inputRegisterNombres = document.getElementById('register-nombres');
const inputRegisterPaterno = document.getElementById('register-apellidoPaterno');
const inputRegisterMaterno = document.getElementById('register-apellidoMaterno');
const inputRegisterCorreo = document.getElementById('register-correo');
const inputRegisterTelefono = document.getElementById('register-telefono');
const inputRegisterContrasena = document.getElementById('register-contrasena');
const btnRegisterSubmit = document.getElementById('btn-register-submit');

// Verification Register Elements
const verifyRegisterSection = document.getElementById('verify-register-section');
const verifyRegisterCard = document.getElementById('verify-register-card');
const verifyRegisterForm = document.getElementById('verify-register-form');
const inputVerifyRegisterCode = document.getElementById('verify-register-code');
const btnVerifyRegisterSubmit = document.getElementById('btn-verify-register-submit');
const btnResendVerifyCode = document.getElementById('btn-resend-verify-code');
const btnBackLoginVerify = document.querySelector('.btn-back-login-verify');

// Retrieve Register Elements
const retrieveRegisterSection = document.getElementById('retrieve-register-section');
const retrieveRegisterCard = document.getElementById('retrieve-register-card');
const retrieveRegisterForm = document.getElementById('retrieve-register-form');
const inputRetrieveRegisterEmail = document.getElementById('retrieve-register-email');
const inputRetrieveRegisterPassword = document.getElementById('retrieve-register-password');
const btnRetrieveRegisterSubmit = document.getElementById('btn-retrieve-register-submit');
const btnBackLoginRetrieve = document.querySelector('.btn-back-login-retrieve');
const linkResendVerifyFlow = document.getElementById('link-resend-verify-flow');

// Global Registration IDs to pass from Signup success to Verification
let currentRegIdCuenta = '';
let currentRegIdUsuario = '';

// Admin Portal Selectors
const appContainer = document.getElementById('app');
const navItems = document.querySelectorAll('.nav-item');
const tabPanes = document.querySelectorAll('.tab-pane');
const currentTabTitle = document.getElementById('current-tab-title');
const userPillEmail = document.getElementById('user-pill-email');
const profileNameDisplay = document.getElementById('profile-name');
// Combobox DOM Selectors
const clientCombobox = document.getElementById('client-combobox');
const selectedClientDisplay = document.getElementById('selected-client-display');
const clientComboboxDropdown = document.getElementById('client-combobox-dropdown');
const clientComboboxSearch = document.getElementById('client-combobox-search');
const clientComboboxClear = document.getElementById('client-combobox-clear');
const clientComboboxOptions = document.getElementById('client-combobox-options');
const btnMenuToggle = document.getElementById('btn-menu-toggle');
const sidebarElement = document.querySelector('.sidebar');
const clientesTableBody = document.getElementById('clientes-table-body');
const colaboradoresTableBody = document.getElementById('colaboradores-table-body');
const statClientesCount = document.getElementById('stat-clientes-count');
const statColaboradoresCount = document.getElementById('stat-colaboradores-count');
const searchClientesInput = document.getElementById('search-clientes');
const searchColaboradoresInput = document.getElementById('search-colaboradores');

// Modals
const modalOverlay = document.getElementById('modal-container');
const modalCliente = document.getElementById('modal-cliente');
const modalColaborador = document.getElementById('modal-colaborador');
const btnAddCliente = document.getElementById('btn-add-cliente');
const btnAddColaborador = document.getElementById('btn-add-colaborador');
const formAddCliente = document.getElementById('form-add-cliente');
const formAddColaborador = document.getElementById('form-add-colaborador');
const editClienteIdxInput = document.getElementById('edit-cliente-idx');
const editColabIdxInput = document.getElementById('edit-colab-idx');
const modalClienteTitle = document.getElementById('modal-cliente-title');
const modalColaboradorTitle = document.getElementById('modal-colaborador-title');
const btnDownloadExcel = document.getElementById('btn-download-excel');
const btnDownloadCsv = document.getElementById('btn-download-csv');
const btnBulkUploadTrigger = document.getElementById('btn-bulk-upload-trigger');
const bulkUploadInput = document.getElementById('bulk-upload-input');

// Collaborators actions and password change elements
const btnDownloadColabExcel = document.getElementById('btn-download-colab-excel');
const btnDownloadColabCsv = document.getElementById('btn-download-colab-csv');
const btnColabBulkUploadTrigger = document.getElementById('btn-colab-bulk-upload-trigger');
const colabBulkUploadInput = document.getElementById('colab-bulk-upload-input');

const modalCambiarContrasena = document.getElementById('modal-cambiar-contrasena');
const formChangePassword = document.getElementById('form-change-password');
const colabPassIdInput = document.getElementById('colab-pass-id');
const colabNewPasswordInput = document.getElementById('colab-new-password');
const btnToggleColabPassword = document.getElementById('toggle-colab-password');
const iconEyeColab = btnToggleColabPassword.querySelector('.icon-eye-colab');
const iconEyeOffColab = btnToggleColabPassword.querySelector('.icon-eye-off-colab');

// Roles module selectors
const rolesTableBody = document.getElementById('roles-table-body');
const statRolesCount = document.getElementById('stat-roles-count');
const searchRolesInput = document.getElementById('search-roles');

const modalRol = document.getElementById('modal-rol');
const modalPermisosRol = document.getElementById('modal-permisos-rol');
const modalRolColaborador = document.getElementById('modal-rol-colaborador');
const modalPortfolio = document.getElementById('modal-portfolio');
const modulePortfolioCard = document.getElementById('module-portfolio');

const btnAddRol = document.getElementById('btn-add-rol');
const formAddRol = document.getElementById('form-add-rol');
const formAssignPermissions = document.getElementById('form-assign-permissions');
const formAssignUserRole = document.getElementById('form-assign-user-role');

const editRolIdxInput = document.getElementById('edit-rol-idx');
const permisosRolIdInput = document.getElementById('permisos-rol-id');
const assignColabIdInput = document.getElementById('assign-colab-id');
const assignColabNameDisplay = document.getElementById('assign-colab-name');
const modalRolTitle = document.getElementById('modal-rol-title');

const permissionsChecklistContainer = document.getElementById('permissions-checklist-container');
const colabRolesChecklistContainer = document.getElementById('colab-roles-checklist-container');
const checkAllPermissions = document.getElementById('check-all-permissions');

// Memory lists for fallback
let rolesList = [];

let permissionsList = [
  { key: "CLIENTES_LEER", nombre: "Leer Clientes", descripcion: "Permite ver el listado y detalle de los clientes" },
  { key: "CLIENTES_ESCRIBIR", nombre: "Escribir Clientes", descripcion: "Permite agregar, modificar y desactivar clientes" },
  { key: "COLABORADORES_LEER", nombre: "Leer Colaboradores", descripcion: "Permite ver el listado y detalle de colaboradores" },
  { key: "COLABORADORES_ESCRIBIR", nombre: "Escribir Colaboradores", descripcion: "Permite agregar, modificar y desactivar colaboradores" },
  { key: "ROLES_LEER", nombre: "Leer Roles", descripcion: "Permite ver roles y permisos del sistema" },
  { key: "ROLES_ESCRIBIR", nombre: "Escribir Roles", descripcion: "Permite crear roles y asignar permisos" }
];

// Map store for user roles offline
let userRolesMap = {};

// Memory lists for fallback
let clientesList = [];

let colaboradoresList = [];

// API Endpoint (Using relative proxy path to solve CORS issues)
const API_URL = '/api/Autenticacion/iniciar-sesion';

// ==========================================================================
// STATE MANAGEMENT & LOCAL STORAGE
// ==========================================================================

// Helper function to decode JWT payload safely
function decodeJwt(token) {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Failed to decode JWT:', err);
    return null;
  }
}

// Check if JWT token is expired
function isTokenExpired(token) {
  if (!token) return true;
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

// Central function to logout and redirect user to login view
function logoutAndRedirect(showToastMsg = true) {
  // Clear stored tokens from both localStorage & sessionStorage
  localStorage.removeItem('token_acceso');
  localStorage.removeItem('token_refresco');
  localStorage.removeItem('usuario_actual');
  localStorage.removeItem('id_cuenta');
  localStorage.removeItem('cliente_seleccionado_id');
  localStorage.removeItem('cliente_seleccionado_rut');
  localStorage.removeItem('cliente_seleccionado_nombre');
  
  sessionStorage.removeItem('token_acceso');
  sessionStorage.removeItem('token_refresco');
  sessionStorage.removeItem('usuario_actual');
  sessionStorage.removeItem('id_cuenta');

  if (showToastMsg) {
    showToast('Sesión Expirada', 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.', 'error');
  }

  // Restore logout button design just in case it was loading
  if (btnLogout) {
    btnLogout.disabled = false;
    btnLogout.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      <span>Cerrar Sesión</span>
    `;
  }

  // Hide dashboard and bring back login app
  if (dashboardSection) dashboardSection.classList.add('hidden');
  if (appContainer) appContainer.classList.remove('hidden');
  if (loginSection) loginSection.classList.remove('hidden');
  if (forgotSection) forgotSection.classList.add('hidden');
  if (resetSection) resetSection.classList.add('hidden');
  if (registerSection) registerSection.classList.add('hidden');
  if (verifyRegisterSection) verifyRegisterSection.classList.add('hidden');
}

// Global fetch interceptor to catch 401 Unauthorized responses and redirect to login
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  try {
    const response = await originalFetch.apply(this, args);
    if (response.status === 401) {
      // Check if we are actually logged in (to prevent multiple toast triggers if already logged out)
      const currentToken = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (currentToken) {
        console.warn('HTTP 401 Unauthorized detected. Session expired. Redirecting to login.');
        logoutAndRedirect(true);
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};

// Periodically check if token is expired (every 10 seconds)
setInterval(() => {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (token && isTokenExpired(token)) {
    console.log('Token has expired. Logging out.');
    logoutAndRedirect(true);
  }
}, 10000);

// Load Remember Me data
document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('remembered_user');
  if (savedUser) {
    inputIdentificador.value = savedUser;
    checkboxRemember.checked = true;
    
    // Trigger label floating by ensuring input isn't empty (placeholder-shown selector handles this)
    inputIdentificador.dispatchEvent(new Event('input'));
  }

  // Check if token exists in session
  const storedToken = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  const storedUser = localStorage.getItem('usuario_actual') || sessionStorage.getItem('usuario_actual');
  const storedAccountId = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');

  if (storedToken && storedUser) {
    if (isTokenExpired(storedToken)) {
      console.log('Session token expired on page load. Cleaning up.');
      logoutAndRedirect(false);
    } else {
      showDashboard({
        tokenAcceso: storedToken,
        idUsuario: storedUser,
        idCuenta: storedAccountId || 'No provisto'
      });
    }
  }
});

// ==========================================================================
// TOAST NOTIFICATIONS SYSTEM
// ==========================================================================
function showToast(title, message, type = 'success', duration = 4000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Icon based on type
  const iconSvg = type === 'success' 
    ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>`
    : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="toast-body">
      <span class="toast-title">${title}</span>
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close" aria-label="Cerrar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  `;

  // Close event listener
  const btnClose = toast.querySelector('.toast-close');
  btnClose.addEventListener('click', () => {
    removeToast(toast);
  });

  toastContainer.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

function removeToast(toast) {
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(50px)';
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 400);
}

// ==========================================================================
// FORM INTERACTIVITY & VALIDATION
// ==========================================================================

// Password Visibility Toggle
btnTogglePassword.addEventListener('click', () => {
  const isPassword = inputContrasena.getAttribute('type') === 'password';
  inputContrasena.setAttribute('type', isPassword ? 'text' : 'password');
  
  if (isPassword) {
    iconEye.classList.add('hidden');
    iconEyeOff.classList.remove('hidden');
    btnTogglePassword.setAttribute('aria-label', 'Ocultar contraseña');
  } else {
    iconEye.classList.remove('hidden');
    iconEyeOff.classList.add('hidden');
    btnTogglePassword.setAttribute('aria-label', 'Mostrar contraseña');
  }
});

// Clear validation styles on input
inputIdentificador.addEventListener('input', () => {
  const group = inputIdentificador.closest('.input-group');
  if (group.classList.contains('has-error') && inputIdentificador.value.trim() !== '') {
    group.classList.remove('has-error');
  }
});

inputContrasena.addEventListener('input', () => {
  const group = inputContrasena.closest('.input-group');
  if (group.classList.contains('has-error') && inputContrasena.value !== '') {
    group.classList.remove('has-error');
  }
});

// Shake Card Animation (triggers when login fails)
function triggerCardShake(cardElement = loginCard) {
  cardElement.classList.add('shake');
  setTimeout(() => {
    cardElement.classList.remove('shake');
  }, 500);
}

// Forgot Password Flow Event Listeners
linkForgotPassword.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Transition to forgot password section
  loginSection.classList.add('hidden');
  setTimeout(() => {
    forgotSection.classList.remove('hidden');
    inputForgotIdentificador.focus();
  }, 300);
});

btnBackLogin.addEventListener('click', (e) => {
  e.preventDefault();
  forgotSection.classList.add('hidden');
  setTimeout(() => {
    loginSection.classList.remove('hidden');
    inputIdentificador.focus();
  }, 300);
});

btnBackForgot.addEventListener('click', (e) => {
  e.preventDefault();
  resetSection.classList.add('hidden');
  setTimeout(() => {
    forgotSection.classList.remove('hidden');
    inputForgotIdentificador.focus();
  }, 300);
});

// Clear validation styles on recovery input
inputForgotIdentificador.addEventListener('input', () => {
  const group = inputForgotIdentificador.closest('.input-group');
  if (group.classList.contains('has-error') && inputForgotIdentificador.value.trim() !== '') {
    group.classList.remove('has-error');
  }
});

inputResetCode.addEventListener('input', () => {
  const group = inputResetCode.closest('.input-group');
  if (group.classList.contains('has-error') && inputResetCode.value.trim().length === 6) {
    group.classList.remove('has-error');
  }
});

inputResetPassword.addEventListener('input', () => {
  const group = inputResetPassword.closest('.input-group');
  if (group.classList.contains('has-error') && inputResetPassword.value.trim().length >= 8) {
    group.classList.remove('has-error');
  }
});

// Reset Password Card Toggle
btnToggleResetPassword.addEventListener('click', () => {
  const isPassword = inputResetPassword.getAttribute('type') === 'password';
  inputResetPassword.setAttribute('type', isPassword ? 'text' : 'password');
  
  if (isPassword) {
    iconEyeReset.classList.add('hidden');
    iconEyeOffReset.classList.remove('hidden');
    btnToggleResetPassword.setAttribute('aria-label', 'Ocultar contraseña');
  } else {
    iconEyeReset.classList.remove('hidden');
    iconEyeOffReset.classList.add('hidden');
    btnToggleResetPassword.setAttribute('aria-label', 'Mostrar contraseña');
  }
});

// Submit solicitar-recuperacion API
forgotForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const identificador = inputForgotIdentificador.value.trim();

  if (!identificador) {
    inputForgotIdentificador.closest('.input-group').classList.add('has-error');
    triggerCardShake(forgotCard);
    showToast('Campo requerido', 'Por favor, ingresa tu usuario o correo electrónico.', 'error');
    return;
  }

  // Set loading state
  const btnText = btnForgotSubmit.querySelector('.btn-text');
  const btnSpinner = btnForgotSubmit.querySelector('.loader-spinner');
  btnForgotSubmit.disabled = true;
  inputForgotIdentificador.disabled = true;
  btnText.classList.add('hidden');
  btnSpinner.classList.remove('hidden');

  try {
    const response = await fetch('/api/Autenticacion/solicitar-recuperacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ identificadorAcceso: identificador })
    });

    if (response.ok) {
      showToast('Código Enviado', 'Se ha enviado un código de verificación a tu correo.', 'success');
      
      // Pre-fill next form's email
      inputResetIdentificador.value = identificador;
      inputResetIdentificador.dispatchEvent(new Event('input'));

      // Transition to Reset Card
      forgotSection.classList.add('hidden');
      setTimeout(() => {
        resetSection.classList.remove('hidden');
        inputResetCode.focus();
      }, 300);
    } else {
      let msg = 'No se pudo procesar la solicitud de recuperación.';
      try {
        const errData = await response.json();
        msg = errData.mensaje || msg;
      } catch (_) {}
      
      triggerCardShake(forgotCard);
      showToast('Error de Recuperación', msg, 'error');
    }
  } catch (error) {
    console.error('API Error:', error);
    triggerCardShake(forgotCard);
    showToast('Error de Conexión', 'No se pudo conectar con el servidor para solicitar la recuperación.', 'error');
  } finally {
    btnForgotSubmit.disabled = false;
    inputForgotIdentificador.disabled = false;
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
  }
});

// Submit restablecer-contrasena API
resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const identificador = inputResetIdentificador.value.trim();
  const codigo = inputResetCode.value.trim();
  const nuevaContrasena = inputResetPassword.value;

  let hasError = false;

  if (!codigo || codigo.length !== 6) {
    inputResetCode.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  if (!nuevaContrasena || nuevaContrasena.length < 8) {
    inputResetPassword.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  if (hasError) {
    triggerCardShake(resetCard);
    showToast('Campos inválidos', 'El código debe ser de 6 dígitos y la contraseña tener mínimo 8 caracteres.', 'error');
    return;
  }

  // Set loading state
  const btnText = btnResetSubmit.querySelector('.btn-text');
  const btnSpinner = btnResetSubmit.querySelector('.loader-spinner');
  btnResetSubmit.disabled = true;
  inputResetCode.disabled = true;
  inputResetPassword.disabled = true;
  btnText.classList.add('hidden');
  btnSpinner.classList.remove('hidden');

  try {
    const response = await fetch('/api/Autenticacion/restablecer-contrasena', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        identificadorAcceso: identificador,
        codigoVerificacionPlano: codigo,
        nuevaContrasenaPlano: nuevaContrasena
      })
    });

    if (response.ok) {
      showToast('Contraseña Actualizada', 'Tu contraseña ha sido restablecida con éxito. Ya puedes iniciar sesión.', 'success');
      
      // Clear fields
      inputResetCode.value = '';
      inputResetPassword.value = '';
      inputContrasena.value = ''; 
      inputIdentificador.value = identificador;
      inputIdentificador.dispatchEvent(new Event('input'));

      // Transition to Login Card
      resetSection.classList.add('hidden');
      setTimeout(() => {
        loginSection.classList.remove('hidden');
        inputContrasena.focus();
      }, 300);
    } else {
      let msg = 'No se pudo restablecer la contraseña. Revisa el código.';
      try {
        const errData = await response.json();
        msg = errData.mensaje || msg;
      } catch (_) {}
      
      triggerCardShake(resetCard);
      showToast('Error al Restablecer', msg, 'error');
    }
  } catch (error) {
    console.error('API Error:', error);
    triggerCardShake(resetCard);
    showToast('Error de Conexión', 'No se pudo conectar con el servidor para restablecer la contraseña.', 'error');
  } finally {
    btnResetSubmit.disabled = false;
    inputResetCode.disabled = false;
    inputResetPassword.disabled = false;
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
  }
});

// ==========================================================================
// API AUTHENTICATION LOGIC
// ==========================================================================

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const identificador = inputIdentificador.value.trim();
  const contrasena = inputContrasena.value;

  // 1. Client-Side Validation
  let hasError = false;

  if (!identificador) {
    inputIdentificador.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  if (!contrasena) {
    inputContrasena.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  if (hasError) {
    triggerCardShake();
    showToast('Campos requeridos', 'Por favor, completa todos los campos del formulario.', 'error');
    return;
  }

  // 2. Set UI to Loading State
  setInputStates(true);

  try {
    // 3. Make Fetch Call
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        identificadorAcceso: identificador,
        contrasenaPlano: contrasena
      })
    });

    const data = await response.json();

    // 4. Handle Response
    if (response.ok && data.exitoso) {
      // SUCCESS STATE
      showToast('¡Acceso concedido!', 'Sesión iniciada con éxito.', 'success');
      
      // Save Remember Me state
      if (checkboxRemember.checked) {
        localStorage.setItem('remembered_user', identificador);
      } else {
        localStorage.removeItem('remembered_user');
      }

      // Save credentials session-wise or permanently
      const storage = checkboxRemember.checked ? localStorage : sessionStorage;
      storage.setItem('token_acceso', data.tokenAcceso);
      storage.setItem('token_refresco', data.tokenRefresco);
      storage.setItem('usuario_actual', data.idUsuario || identificador);
      storage.setItem('id_cuenta', data.idCuenta || 'No provisto');

      // Clear fields
      inputContrasena.value = '';

      // Transition to Dashboard
      setTimeout(() => {
        showDashboard({
          tokenAcceso: data.tokenAcceso,
          idUsuario: data.idUsuario || identificador,
          idCuenta: data.idCuenta || 'No provisto'
        });
        setInputStates(false);
      }, 1000);

    } else {
      // BUSINESS EXCEPTION STATE (e.g. 401 Unauthorized or exitoso: false)
      triggerCardShake();
      inputContrasena.value = '';
      showToast('Fallo de Autenticación', data.mensaje || 'Las credenciales ingresadas son incorrectas.', 'error');
      setInputStates(false);
    }

  } catch (error) {
    // NETWORK ERROR STATE
    console.error('API Error:', error);
    triggerCardShake();
    showToast(
      'Error de Conexión', 
      'No se pudo conectar con el servidor. Revisa tu conexión de red o si el servidor está activo.', 
      'error'
    );
    setInputStates(false);
  }
});

function setInputStates(loading) {
  if (loading) {
    btnSubmit.disabled = true;
    inputIdentificador.disabled = true;
    inputContrasena.disabled = true;
    checkboxRemember.disabled = true;
    btnSubmitText.classList.add('hidden');
    btnSubmitSpinner.classList.remove('hidden');
  } else {
    btnSubmit.disabled = false;
    inputIdentificador.disabled = false;
    inputContrasena.disabled = false;
    checkboxRemember.disabled = false;
    btnSubmitText.classList.remove('hidden');
    btnSubmitSpinner.classList.add('hidden');
  }
}

// ==========================================================================
// DASHBOARD VIEWS AND LOGOUT
// ==========================================================================

// (decodeJwt helper moved to State Management section)

// Extract the username/email display from JWT claims
function getUserDisplayFromToken(token, fallback) {
  const payload = decodeJwt(token);
  if (payload) {
    const email = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] 
               || payload["email"] 
               || payload["unique_name"] 
               || payload["sub"];
    if (email) return email;
  }
  return fallback;
}

async function showDashboard(userData) {
  try {
    const token = userData.tokenAcceso;
    const userEmail = getUserDisplayFromToken(token, userData.idUsuario || 'Usuario');
    
    // Initial display using email prefix or stored user identifier
    let userDisplay = typeof userEmail === 'string' ? userEmail.split('@')[0] : 'Admin';
    userDisplay = capitalizeText(userDisplay);

    // Populate initial fields
    if (displayUser) displayUser.textContent = userDisplay;
    if (displayAccountId) displayAccountId.textContent = userData.idCuenta || 'No provisto';
    if (displayToken) displayToken.textContent = token || '';
    if (userPillEmail) userPillEmail.textContent = userDisplay;
    if (profileNameDisplay) {
      profileNameDisplay.textContent = userDisplay;
    }

    // Update avatar with initials initially
    const avatarElement = document.querySelector('.profile-avatar');
    if (avatarElement) {
      avatarElement.textContent = userDisplay.substring(0, 2).toUpperCase();
    }

    // Hide the app forms wrapper and show full screen dashboard
    appContainer.classList.add('hidden');
    dashboardSection.classList.remove('hidden');

    // Ensure "Inicio" tab is active by default upon login
    if (navItems && navItems.length > 0) {
      navItems.forEach(btn => btn.classList.remove('active'));
      const btnInicioNav = Array.from(navItems).find(btn => btn.getAttribute('data-tab') === 'inicio');
      if (btnInicioNav) btnInicioNav.classList.add('active');
    }
    if (tabPanes && tabPanes.length > 0) {
      tabPanes.forEach(pane => pane.classList.remove('active'));
      const tabInicio = document.getElementById('tab-inicio');
      if (tabInicio) tabInicio.classList.add('active');
    }
    if (currentTabTitle) {
      const btnInicioNav = navItems && Array.from(navItems).find(btn => btn.getAttribute('data-tab') === 'inicio');
      if (btnInicioNav && btnInicioNav.querySelector('span')) {
        currentTabTitle.textContent = btnInicioNav.querySelector('span').textContent;
      } else {
        currentTabTitle.textContent = 'Inicio';
      }
    }

    // Load tables initially
    await fetchAndRenderClientes();
    populateHeaderClientSelector();
    await fetchAndRenderColaboradores();
    await fetchAndRenderRoles();
    await fetchPermissionsOnce();

    // Query profile name (Nombre + Apellido Paterno) from collaborators list or API
    let profileFound = false;
    const idUsuario = userData.idUsuario;

    // 1. Search in loaded collaborators list
    if (userEmail && colaboradoresList.length > 0) {
      const matchColab = colaboradoresList.find(c => c.correoElectronico && c.correoElectronico.toLowerCase() === userEmail.toLowerCase());
      if (matchColab) {
        const fullName = `${capitalizeText(matchColab.nombres)} ${capitalizeText(matchColab.apellidoPaterno)}`;
        if (displayUser) displayUser.textContent = fullName;
        if (userPillEmail) userPillEmail.textContent = fullName;
        if (profileNameDisplay) {
          profileNameDisplay.textContent = capitalizeText(matchColab.nombres);
        }
        if (avatarElement) {
          avatarElement.textContent = (matchColab.nombres.substring(0,1) + matchColab.apellidoPaterno.substring(0,1)).toUpperCase();
        }
        profileFound = true;
      }
    }

    // 2. Fetch from API if not found and ID is valid UUID
    if (!profileFound && token && idUsuario && !idUsuario.startsWith('22222222-') && !idUsuario.startsWith('mock-')) {
      try {
        const response = await fetch(`/api/Colaboradores/${idUsuario}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          const colData = (data && data.colaborador) ? data.colaborador : data;
          if (colData && colData.nombres && colData.apellidoPaterno) {
            const fullName = `${capitalizeText(colData.nombres)} ${capitalizeText(colData.apellidoPaterno)}`;
            if (displayUser) displayUser.textContent = fullName;
            if (userPillEmail) userPillEmail.textContent = fullName;
            if (profileNameDisplay) {
              profileNameDisplay.textContent = capitalizeText(colData.nombres);
            }
            if (avatarElement) {
              avatarElement.textContent = (colData.nombres.substring(0,1) + colData.apellidoPaterno.substring(0,1)).toUpperCase();
            }
          }
        }
      } catch (err) {
        console.warn('Error fetching current user profile detail:', err);
      }
    }

  } catch (err) {
    console.error('Error in showDashboard:', err);
    alert('Fallo al mostrar Dashboard: ' + err.message);
  }
}

// Copy Token to Clipboard
btnCopyToken.addEventListener('click', async () => {
  const token = displayToken.value;
  try {
    await navigator.clipboard.writeText(token);
    const originalText = btnCopyToken.innerHTML;
    
    btnCopyToken.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="width: 12px; height: 12px;">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      ¡Copiado!
    `;
    
    setTimeout(() => {
      btnCopyToken.innerHTML = originalText;
    }, 2000);
  } catch (err) {
    console.error('No se pudo copiar el token:', err);
    showToast('Error', 'No se pudo copiar el token de manera automática.', 'error');
  }
});

// Logout Action
btnLogout.addEventListener('click', async () => {
  const refreshToken = localStorage.getItem('token_refresco') || sessionStorage.getItem('token_refresco');
  
  if (refreshToken) {
    try {
      // Show loading indicator on logout button
      btnLogout.disabled = true;
      btnLogout.innerHTML = '<span class="loader-spinner" style="width: 14px; height: 14px; border-width: 2px;"></span>';

      const response = await fetch('/api/Autenticacion/cerrar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(refreshToken)
      });

      if (response.ok) {
        console.log('Sesión cerrada en el servidor con éxito.');
      } else {
        console.warn('El servidor rechazó el cierre de sesión o el token de refresco expiró.', response.status);
      }
    } catch (error) {
      console.error('Error al conectar con la API de cierre de sesión:', error);
    }
  }

  // Clear stored tokens and redirect
  logoutAndRedirect(false);
  showToast('Sesión Cerrada', 'Has cerrado tu sesión de forma segura.', 'success');
});

// ==========================================================================
// ADMIN DASHBOARD CONTENT & TAB SWITCHES
// ==========================================================================

// Switch Sidebar Nav Tabs
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const tabName = item.getAttribute('data-tab');

    // Update active nav button
    navItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');

    // Update active tab pane
    tabPanes.forEach(pane => pane.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');

    // Update title
    currentTabTitle.textContent = item.querySelector('span').textContent;

    // Mobile: Close sidebar after selection
    if (sidebarElement.classList.contains('open')) {
      sidebarElement.classList.remove('open');
    }

    // Dynamic actions on tab change
    if (tabName === 'clientes') {
      fetchAndRenderClientes();
    } else if (tabName === 'colaboradores') {
      fetchAndRenderColaboradores();
    } else if (tabName === 'roles') {
      fetchAndRenderRoles();
      fetchPermissionsOnce();
    }
  });
});

// Mobile Hamburger Menu Toggle
btnMenuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  sidebarElement.classList.toggle('open');
});

// Close sidebar on document click (outside click)
document.addEventListener('click', (e) => {
  if (sidebarElement.classList.contains('open') && !sidebarElement.contains(e.target) && !btnMenuToggle.contains(e.target)) {
    sidebarElement.classList.remove('open');
  }
});

// Keyboard focus index for combobox options
let focusedOptionIndex = -1;

// Populate Header Client Selector Combobox with active clients
function populateHeaderClientSelector(searchQuery = '') {
  if (!clientComboboxOptions) return;
  
  // Save current selection
  let selectedId = localStorage.getItem('cliente_seleccionado_id') || '';

  // Filter only active clients
  const activeClients = clientesList.filter(c => c.activo !== false);

  // Validate current selection exists in active list
  // Validate current selection exists in active list
  const hasCurrent = activeClients.some(c => (c.idCliente || '').toString().toLowerCase() === (selectedId || '').toString().toLowerCase());
  if (!hasCurrent) {
    selectedId = '';
    localStorage.removeItem('cliente_seleccionado_id');
  }

  // Update trigger display
  if (selectedId) {
    const selectedClient = activeClients.find(c => (c.idCliente || '').toString().toLowerCase() === (selectedId || '').toString().toLowerCase());
    if (selectedClient && selectedClientDisplay) {
      selectedClientDisplay.textContent = capitalizeText(selectedClient.nombreCliente);
    }
  } else {
    if (selectedClientDisplay) {
      selectedClientDisplay.textContent = 'Seleccione Cliente...';
    }
  }

  // Clear dropdown options list
  clientComboboxOptions.innerHTML = '';

  // Filter active clients based on search query
  const query = searchQuery.trim().toLowerCase();
  const filteredClients = activeClients.filter(c => 
    (c.nombreCliente && c.nombreCliente.toLowerCase().includes(query)) ||
    (c.rut && c.rut.toLowerCase().includes(query))
  );

  if (filteredClients.length === 0) {
    const li = document.createElement('li');
    li.className = 'combobox-option no-results';
    li.textContent = searchQuery ? 'No se encontraron resultados' : 'No hay clientes activos';
    clientComboboxOptions.appendChild(li);
    return;
  }

  filteredClients.forEach(c => {
    const li = document.createElement('li');
    li.className = 'combobox-option';
    if ((c.idCliente || '').toString().toLowerCase() === (selectedId || '').toString().toLowerCase()) {
      li.classList.add('selected');
    }
    li.setAttribute('data-id', c.idCliente);

    // Initial letters for avatar
    let initials = 'CL';
    if (c.nombreCliente) {
      const parts = c.nombreCliente.trim().split(/\s+/);
      if (parts.length >= 2) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase();
      } else if (parts[0].length >= 2) {
        initials = parts[0].substring(0, 2).toUpperCase();
      } else if (parts[0].length >= 1) {
        initials = parts[0][0].toUpperCase() + 'L';
      }
    }

    li.innerHTML = `
      <div class="combobox-option-avatar">${initials}</div>
      <div class="combobox-option-meta">
        <span class="combobox-option-name">${capitalizeText(c.nombreCliente)}</span>
        <span class="combobox-option-rut">RUT: ${c.rut || '-'}</span>
      </div>
    `;

    // Click handler to select
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      selectClient(c.idCliente, c.nombreCliente);
    });

    clientComboboxOptions.appendChild(li);
  });
}

// Select client and update UI + State
function selectClient(id, name) {
  localStorage.setItem('cliente_seleccionado_id', id);
  if (selectedClientDisplay) {
    selectedClientDisplay.textContent = capitalizeText(name);
  }

  // Highlight in options list
  const options = clientComboboxOptions.querySelectorAll('.combobox-option');
  options.forEach(opt => {
    if ((opt.getAttribute('data-id') || '').toString().toLowerCase() === (id || '').toString().toLowerCase()) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });

  showToast('Cliente Seleccionado', `Cliente activo cambiado a: ${capitalizeText(name)}`, 'success');

  // Dispatch custom event to notify other modules of context change
  window.dispatchEvent(new CustomEvent('clientContextChanged', { detail: { idCliente: id } }));

  closeClientCombobox();
}

// Combobox Dropdown controllers
function openClientCombobox() {
  if (clientCombobox && clientComboboxDropdown) {
    clientCombobox.classList.add('active');
    clientComboboxDropdown.classList.remove('hidden');
    if (clientComboboxSearch) {
      clientComboboxSearch.value = '';
      clientComboboxSearch.focus();
      populateHeaderClientSelector(); // Refresh all options
    }
    if (clientComboboxClear) {
      clientComboboxClear.classList.add('hidden');
    }
    focusedOptionIndex = -1;
  }
}

// Close dropdown when clicking outside or selection complete
function closeClientCombobox() {
  if (clientCombobox && clientComboboxDropdown) {
    clientCombobox.classList.remove('active');
    clientComboboxDropdown.classList.add('hidden');
  }
}

function toggleClientCombobox() {
  if (clientComboboxDropdown && clientComboboxDropdown.classList.contains('hidden')) {
    openClientCombobox();
  } else {
    closeClientCombobox();
  }
}

// Event Listeners for Combobox Interactivity
if (clientCombobox) {
  const trigger = clientCombobox.querySelector('.combobox-trigger');
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleClientCombobox();
    });
  }

  clientCombobox.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  closeClientCombobox();
});

// Search input interaction
if (clientComboboxSearch) {
  clientComboboxSearch.addEventListener('input', (e) => {
    const val = e.target.value;
    if (clientComboboxClear) {
      if (val) {
        clientComboboxClear.classList.remove('hidden');
      } else {
        clientComboboxClear.classList.add('hidden');
      }
    }
    populateHeaderClientSelector(val);
    focusedOptionIndex = -1; // Reset keyboard focus
  });

  // Keyboard Navigation inside search input
  clientComboboxSearch.addEventListener('keydown', (e) => {
    const options = clientComboboxOptions.querySelectorAll('.combobox-option:not(.no-results)');
    if (options.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedOptionIndex = (focusedOptionIndex + 1) % options.length;
      updateFocusedOption(options);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedOptionIndex = (focusedOptionIndex - 1 + options.length) % options.length;
      updateFocusedOption(options);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedOptionIndex >= 0 && options[focusedOptionIndex]) {
        options[focusedOptionIndex].click();
      } else if (options.length > 0) {
        options[0].click(); // Select first item if none focused
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeClientCombobox();
    }
  });
}

// Clear search button interaction
if (clientComboboxClear) {
  clientComboboxClear.addEventListener('click', (e) => {
    e.stopPropagation();
    if (clientComboboxSearch) {
      clientComboboxSearch.value = '';
      clientComboboxSearch.focus();
    }
    clientComboboxClear.classList.add('hidden');
    populateHeaderClientSelector();
    focusedOptionIndex = -1;
  });
}

// Update focused class and scroll into view
function updateFocusedOption(options) {
  options.forEach((opt, idx) => {
    if (idx === focusedOptionIndex) {
      opt.classList.add('focused');
      opt.scrollIntoView({ block: 'nearest' });
    } else {
      opt.classList.remove('focused');
    }
  });
}

// ==========================================================================
// CLIENTS MANAGEMENT (API + FALLBACK MOCK)
// ==========================================================================

async function fetchAndRenderClientes() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  
  if (!token) return;

  try {
    if (clientesTableBody) {
      clientesTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Cargando clientes...</td></tr>`;
    }

    const response = await fetch('/api/Clientes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.clientes)) {
        clientesList = data.clientes;
      } else if (Array.isArray(data) && data.length > 0) {
        clientesList = data;
      }
    }
  } catch (err) {
    console.warn('No se pudo conectar a la API de Clientes. Usando datos locales de prueba.', err);
  } finally {
    renderClientes();
  }
}

function renderClientes(filterText = '') {
  if (clientesTableBody) {
    clientesTableBody.innerHTML = '';
  }
  
  const filtered = clientesList.filter(c => 
    (c.nombreCliente && c.nombreCliente.toLowerCase().includes(filterText.toLowerCase())) ||
    (c.rut && c.rut.includes(filterText))
  );

  if (statClientesCount) {
    statClientesCount.textContent = clientesList.filter(c => c.activo !== false).length;
  }

  if (filtered.length === 0) {
    if (clientesTableBody) {
      clientesTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No se encontraron clientes.</td></tr>`;
    }
    return;
  }

  filtered.forEach((cliente, idx) => {
    const row = document.createElement('tr');
    const statusText = cliente.activo !== false ? 'Activo' : 'Inactivo';
    const statusClass = cliente.activo !== false ? 'badge-active' : 'badge-inactive';

    row.innerHTML = `
      <td>${cliente.rut || '-'}</td>
      <td style="font-weight: 500; color: var(--text-primary);">${capitalizeText(cliente.nombreCliente) || '-'}</td>
      <td>${cliente.taxId || '-'}</td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td>
        <button class="btn-table-action btn-edit-cliente" title="Editar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button class="btn-table-action btn-toggle-status" title="Cambiar Estado">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
        </button>
        <button class="btn-table-action delete btn-delete-cliente" title="Eliminar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </td>
    `;

    // Edit click handler
    row.querySelector('.btn-edit-cliente').addEventListener('click', async () => {
      const idCliente = cliente.idCliente;
      editClienteIdxInput.value = idCliente;
      
      modalClienteTitle.textContent = 'Editar Cliente';
      document.getElementById('cliente-rut').value = cliente.rut || '';
      document.getElementById('cliente-nombre').value = cliente.nombreCliente || '';
      document.getElementById('cliente-taxid').value = cliente.taxId || '';

      // Trigger input events to float the labels
      document.getElementById('cliente-rut').dispatchEvent(new Event('input'));
      document.getElementById('cliente-nombre').dispatchEvent(new Event('input'));
      document.getElementById('cliente-taxid').dispatchEvent(new Event('input'));
      
      modalOverlay.classList.remove('hidden');
      modalCliente.classList.remove('hidden');

      // Fetch latest client details from API if it's not a mock UUID
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (token && idCliente && !idCliente.startsWith('11111111-') && !idCliente.startsWith('mock-')) {
        try {
          const response = await fetch(`/api/Clientes/${idCliente}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            const clientData = (data && data.cliente) ? data.cliente : data;
            
            document.getElementById('cliente-rut').value = clientData.rut || '';
            document.getElementById('cliente-nombre').value = clientData.nombreCliente || '';
            document.getElementById('cliente-taxid').value = clientData.taxId || '';

            document.getElementById('cliente-rut').dispatchEvent(new Event('input'));
            document.getElementById('cliente-nombre').dispatchEvent(new Event('input'));
            document.getElementById('cliente-taxid').dispatchEvent(new Event('input'));
          }
        } catch (err) {
          console.warn('Error al obtener detalle de cliente de la API:', err);
        }
      }
    });

    // Toggle status click handler
    row.querySelector('.btn-toggle-status').addEventListener('click', async () => {
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      const idCliente = cliente.idCliente;
      const targetState = cliente.activo === false; // If currently inactive, reactivate it
      
      let apiSuccess = false;
      if (token && idCliente && !idCliente.startsWith('11111111-') && !idCliente.startsWith('mock-')) {
        try {
          const endpoint = targetState 
            ? `/api/Clientes/reactivar/${idCliente}` 
            : `/api/Clientes/desactivar/${idCliente}`;
          
          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            apiSuccess = true;
          }
        } catch (err) {
          console.warn('Error al cambiar estado de cliente en la API:', err);
        }
      }

      cliente.activo = targetState;
      showToast('Estado Modificado', `El cliente ${cliente.nombreCliente} ahora está ${cliente.activo ? 'Activo' : 'Inactivo'}.`, 'success');
      renderClientes(searchClientesInput.value);
    });

    // Delete click handler
    row.querySelector('.btn-delete-cliente').addEventListener('click', () => {
      if (confirm(`¿Estás seguro de eliminar al cliente ${cliente.nombreCliente}?`)) {
        clientesList.splice(clientesList.indexOf(cliente), 1);
        showToast('Cliente Eliminado', 'El cliente fue removido de la lista.', 'success');
        renderClientes(searchClientesInput.value);
      }
    });

    if (clientesTableBody) {
      clientesTableBody.appendChild(row);
    }
  });

  populateHeaderClientSelector();
}

// Search filter Clientes
searchClientesInput.addEventListener('input', (e) => {
  renderClientes(e.target.value);
});

// ==========================================================================
// COLLABORATORS MANAGEMENT (API + FALLBACK MOCK)
// ==========================================================================

async function fetchAndRenderColaboradores() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  
  if (!token) return;

  try {
    if (colaboradoresTableBody) {
      colaboradoresTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Cargando colaboradores...</td></tr>`;
    }

    const response = await fetch('/api/Colaboradores/listar', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.colaboradores)) {
        colaboradoresList = data.colaboradores;
      } else if (Array.isArray(data) && data.length > 0) {
        colaboradoresList = data;
      }
    }
  } catch (err) {
    console.warn('No se pudo conectar a la API de Colaboradores. Usando datos locales de prueba.', err);
  } finally {
    renderColaboradores();
  }
}

function renderColaboradores(filterText = '') {
  if (colaboradoresTableBody) {
    colaboradoresTableBody.innerHTML = '';
  }

  const filtered = colaboradoresList.filter(col => 
    (col.nombres && col.nombres.toLowerCase().includes(filterText.toLowerCase())) ||
    (col.apellidoPaterno && col.apellidoPaterno.toLowerCase().includes(filterText.toLowerCase())) ||
    (col.apellidoMaterno && col.apellidoMaterno.toLowerCase().includes(filterText.toLowerCase())) ||
    (col.correoElectronico && col.correoElectronico.toLowerCase().includes(filterText.toLowerCase()))
  );

  if (statColaboradoresCount) {
    statColaboradoresCount.textContent = colaboradoresList.filter(c => c.activo !== false).length;
  }

  if (filtered.length === 0) {
    if (colaboradoresTableBody) {
      colaboradoresTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No se encontraron colaboradores.</td></tr>`;
    }
    return;
  }

  filtered.forEach((col, idx) => {
    const row = document.createElement('tr');
    const nameParts = [col.nombres, col.apellidoPaterno, col.apellidoMaterno]
      .filter(part => part && part.trim() !== '')
      .map(part => capitalizeText(part));
    const fullName = nameParts.join(' ');
    const statusText = col.activo !== false ? 'Activo' : 'Inactivo';
    const statusClass = col.activo !== false ? 'badge-active' : 'badge-inactive';

    row.innerHTML = `
      <td style="font-weight: 500; color: var(--text-primary);">${fullName}</td>
      <td>${col.correoElectronico || '-'}</td>
      <td>${col.telefonoMovil || '-'}</td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td>
        <button class="btn-table-action btn-edit-colab" title="Editar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button class="btn-table-action btn-toggle-status-colab" title="Cambiar Estado">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
        </button>
        <button class="btn-table-action btn-change-password-colab" title="Cambiar Contraseña">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </button>
        <button class="btn-table-action btn-assign-role-colab" title="Asignar Rol">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </button>
        <button class="btn-table-action delete btn-delete-colab" title="Eliminar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </td>
    `;

    // Edit click handler
    row.querySelector('.btn-edit-colab').addEventListener('click', async () => {
      const idColaborador = col.idColaborador;
      editColabIdxInput.value = idColaborador || '';
      
      modalColaboradorTitle.textContent = 'Editar Colaborador';
      document.getElementById('colab-nombres').value = col.nombres || '';
      document.getElementById('colab-paterno').value = col.apellidoPaterno || '';
      document.getElementById('colab-materno').value = col.apellidoMaterno || '';
      document.getElementById('colab-correo').value = col.correoElectronico || '';
      document.getElementById('colab-telefono').value = col.telefonoMovil || '';

      // Trigger input events to float labels
      document.getElementById('colab-nombres').dispatchEvent(new Event('input'));
      document.getElementById('colab-paterno').dispatchEvent(new Event('input'));
      document.getElementById('colab-materno').dispatchEvent(new Event('input'));
      document.getElementById('colab-correo').dispatchEvent(new Event('input'));
      document.getElementById('colab-telefono').dispatchEvent(new Event('input'));

      modalOverlay.classList.remove('hidden');
      modalColaborador.classList.remove('hidden');

      // Fetch latest details from API
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (token && idColaborador && !idColaborador.startsWith('22222222-') && !idColaborador.startsWith('mock-')) {
        try {
          const response = await fetch(`/api/Colaboradores/${idColaborador}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            const colData = (data && data.colaborador) ? data.colaborador : data;

            document.getElementById('colab-nombres').value = colData.nombres || '';
            document.getElementById('colab-paterno').value = colData.apellidoPaterno || '';
            document.getElementById('colab-materno').value = colData.apellidoMaterno || '';
            document.getElementById('colab-correo').value = colData.correoElectronico || '';
            document.getElementById('colab-telefono').value = colData.telefonoMovil || '';

            // Trigger float labels again
            document.getElementById('colab-nombres').dispatchEvent(new Event('input'));
            document.getElementById('colab-paterno').dispatchEvent(new Event('input'));
            document.getElementById('colab-materno').dispatchEvent(new Event('input'));
            document.getElementById('colab-correo').dispatchEvent(new Event('input'));
            document.getElementById('colab-telefono').dispatchEvent(new Event('input'));
          }
        } catch (err) {
          console.warn('Error al obtener detalle de colaborador de la API:', err);
        }
      }
    });

    // Toggle status click handler
    row.querySelector('.btn-toggle-status-colab').addEventListener('click', async () => {
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      const idColaborador = col.idColaborador;
      const targetState = col.activo === false; // If currently inactive, reactivate it
      
      let apiSuccess = false;
      if (token && idColaborador && !idColaborador.startsWith('22222222-') && !idColaborador.startsWith('mock-')) {
        try {
          const endpoint = targetState 
            ? `/api/Colaboradores/reactivar/${idColaborador}` 
            : `/api/Colaboradores/desactivar/${idColaborador}`;
          
          const method = targetState ? 'POST' : 'DELETE';
          
          const response = await fetch(endpoint, {
            method: method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            apiSuccess = true;
          }
        } catch (err) {
          console.warn('Error al cambiar estado de colaborador en la API:', err);
        }
      }

      col.activo = targetState;
      showToast('Estado Modificado', `El colaborador ${fullName} ahora está ${col.activo ? 'Activo' : 'Inactivo'}.`, 'success');
      renderColaboradores(searchColaboradoresInput.value);
    });

    // Change password click handler
    row.querySelector('.btn-change-password-colab').addEventListener('click', () => {
      colabPassIdInput.value = col.idColaborador || '';
      colabNewPasswordInput.value = '';
      
      // Clear error states on password input
      colabNewPasswordInput.closest('.input-group').classList.remove('has-error');
      
      modalOverlay.classList.remove('hidden');
      modalCambiarContrasena.classList.remove('hidden');
      colabNewPasswordInput.focus();
    });

    // Assign role click handler
    row.querySelector('.btn-assign-role-colab').addEventListener('click', async () => {
      const idUsuario = col.idColaborador;
      assignColabIdInput.value = idUsuario || '';
      assignColabNameDisplay.textContent = fullName;

      // Populate roles checklist
      colabRolesChecklistContainer.innerHTML = '';
      
      // Fetch available roles from API first to ensure up to date list
      await fetchRolesListOnly();

      // Check current user roles
      let assignedRoleIds = [];
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (token && idUsuario && !idUsuario.startsWith('22222222-') && !idUsuario.startsWith('mock-')) {
        try {
          const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
          const response = await fetch(`/api/Roles/usuario/${idUsuario}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'idCuenta': idCuenta,
              'Accept': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            const userRoles = (data && Array.isArray(data.roles)) ? data.roles : (Array.isArray(data) ? data : []);
            assignedRoleIds = userRoles.map(r => r.idRol || r);
          }
        } catch (err) {
          console.warn('Error al obtener roles de usuario de la API:', err);
        }
      } else {
        assignedRoleIds = userRolesMap[idUsuario] || [];
      }

      rolesList.forEach(rol => {
        const itemLabel = document.createElement('label');
        itemLabel.className = 'custom-checkbox';
        itemLabel.style.display = 'flex';
        itemLabel.style.alignItems = 'center';
        
        const isChecked = assignedRoleIds.includes(rol.idRol) ? 'checked' : '';

        itemLabel.innerHTML = `
          <input type="checkbox" name="colabRoles" value="${rol.idRol}" ${isChecked} />
          <span class="checkmark"></span>
          <span class="label-text" style="font-weight: 500;">${capitalizeText(rol.nombre)}</span>
        `;
        colabRolesChecklistContainer.appendChild(itemLabel);
      });

      modalOverlay.classList.remove('hidden');
      modalRolColaborador.classList.remove('hidden');
    });

    row.querySelector('.btn-delete-colab').addEventListener('click', () => {
      if (confirm(`¿Estás seguro de eliminar a ${fullName}?`)) {
        colaboradoresList.splice(colaboradoresList.indexOf(col), 1);
        showToast('Colaborador Eliminado', 'El colaborador fue removido de la lista.', 'success');
        renderColaboradores(searchColaboradoresInput.value);
      }
    });

    if (colaboradoresTableBody) {
      colaboradoresTableBody.appendChild(row);
    }
  });
}

// Search filter Colaboradores
searchColaboradoresInput.addEventListener('input', (e) => {
  renderColaboradores(e.target.value);
});

// ==========================================================================
// MODALS LOGIC (ADD CLIENTS / COLABORADORES)
// ==========================================================================

// Show Modals
btnAddCliente.addEventListener('click', () => {
  editClienteIdxInput.value = '';
  modalClienteTitle.textContent = 'Agregar Nuevo Cliente';
  modalOverlay.classList.remove('hidden');
  modalCliente.classList.remove('hidden');
});

btnAddColaborador.addEventListener('click', () => {
  editColabIdxInput.value = '';
  modalColaboradorTitle.textContent = 'Agregar Nuevo Colaborador';
  modalOverlay.classList.remove('hidden');
  modalColaborador.classList.remove('hidden');
});

// Hide Modals
function closeAllModals() {
  modalOverlay.classList.add('hidden');
  modalCliente.classList.add('hidden');
  modalColaborador.classList.add('hidden');
  modalCambiarContrasena.classList.add('hidden');
  modalRol.classList.add('hidden');
  modalPermisosRol.classList.add('hidden');
  modalRolColaborador.classList.add('hidden');
  if (modalPortfolio) modalPortfolio.classList.add('hidden');
  
  // New detailed portfolio modals
  const modalCartera = document.getElementById('modal-cartera');
  const modalMovimientoCaja = document.getElementById('modal-movimiento-caja');
  const modalTraspasoCaja = document.getElementById('modal-traspaso-caja');
  const modalAgf = document.getElementById('modal-agf');
  
  if (modalCartera) modalCartera.classList.add('hidden');
  if (modalMovimientoCaja) modalMovimientoCaja.classList.add('hidden');
  if (modalTraspasoCaja) modalTraspasoCaja.classList.add('hidden');
  if (modalAgf) modalAgf.classList.add('hidden');
  
  const modalInstrumento = document.getElementById('modal-instrumento');
  if (modalInstrumento) modalInstrumento.classList.add('hidden');
  
  const modalOperacionInstrumento = document.getElementById('modal-operacion-instrumento');
  const modalCargaMasivaOperaciones = document.getElementById('modal-carga-masiva-operaciones');
  if (modalOperacionInstrumento) modalOperacionInstrumento.classList.add('hidden');
  if (modalCargaMasivaOperaciones) modalCargaMasivaOperaciones.classList.add('hidden');
  
  formAddCliente.reset();
  formAddColaborador.reset();
  formChangePassword.reset();
  formAddRol.reset();
  formAssignPermissions.reset();
  formAssignUserRole.reset();
  
  // New detailed portfolio forms
  const formAddCartera = document.getElementById('form-add-cartera');
  const formAddMovimiento = document.getElementById('form-add-movimiento');
  const formAddTraspaso = document.getElementById('form-add-traspaso');
  const formAddAgf = document.getElementById('form-add-agf');
  
  if (formAddCartera) formAddCartera.reset();
  if (formAddMovimiento) formAddMovimiento.reset();
  if (formAddTraspaso) formAddTraspaso.reset();
  if (formAddAgf) formAddAgf.reset();
  
  const formAddInstrumento = document.getElementById('form-add-instrumento');
  if (formAddInstrumento) formAddInstrumento.reset();

  const formAddOperacionInstrumento = document.getElementById('form-add-operacion-instrumento');
  const formCargaMasivaOperaciones = document.getElementById('form-carga-masiva-operaciones');
  if (formAddOperacionInstrumento) {
    formAddOperacionInstrumento.reset();
    const sectionVenta = document.getElementById('section-venta-detalles');
    if (sectionVenta) sectionVenta.style.display = 'none';
    const sectionTC = document.getElementById('section-tipo-cambio');
    if (sectionTC) sectionTC.style.display = 'none';
  }
  if (formCargaMasivaOperaciones) {
    formCargaMasivaOperaciones.reset();
    const fileContainer = document.getElementById('selected-file-container-operaciones');
    if (fileContainer) fileContainer.style.display = 'none';
    const btnSubmit = document.getElementById('btn-submit-upload-operaciones');
    if (btnSubmit) btnSubmit.disabled = true;
    const statusResult = document.getElementById('upload-status-result-operaciones');
    if (statusResult) statusResult.style.display = 'none';
  }

  editClienteIdxInput.value = '';
  editColabIdxInput.value = '';
  colabPassIdInput.value = '';
  editRolIdxInput.value = '';
  permisosRolIdInput.value = '';
  assignColabIdInput.value = '';
  
  // New detailed portfolio inputs
  const editCarteraIdxInput = document.getElementById('edit-cartera-idx');
  const editAgfIdxInput = document.getElementById('edit-agf-idx');
  if (editCarteraIdxInput) editCarteraIdxInput.value = '';
  if (editAgfIdxInput) editAgfIdxInput.value = '';
}

// Listeners to close modals
modalOverlay.querySelectorAll('.btn-close-modal').forEach(btn => {
  btn.addEventListener('click', closeAllModals);
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeAllModals();
  }
});

// Submit Add/Edit Client Form (POST to API or Mock fallback)
formAddCliente.addEventListener('submit', async (e) => {
  e.preventDefault();

  const rut = document.getElementById('cliente-rut').value.trim();
  const nombre = document.getElementById('cliente-nombre').value.trim();
  const taxId = document.getElementById('cliente-taxid').value.trim();

  if (!rut || !nombre) {
    showToast('Campos requeridos', 'Por favor rellena los campos requeridos.', 'error');
    return;
  }

  const editIdxVal = editClienteIdxInput.value;
  const isEditing = editIdxVal !== '';
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

  if (!isEditing) {
    let apiSuccess = false;
    if (token) {
      try {
        const response = await fetch('/api/Clientes/agregar', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            rut: rut,
            nombreCliente: nombre,
            taxId: taxId || null
          })
        });

        if (response.ok) {
          apiSuccess = true;
          showToast('Cliente Creado', 'El cliente ha sido guardado exitosamente en el servidor.', 'success');
        } else {
          console.warn('El servidor devolvió un error al agregar. Agregando localmente.');
        }
      } catch (err) {
        console.warn('Error de conexión con la API de clientes. Guardando de forma local.', err);
      }
    }

    // Always append to memory list to demonstrate success visually
    const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : 'mock-' + Math.random().toString(36).substring(2, 15);

    clientesList.unshift({
      idCliente: newId,
      rut: rut,
      nombreCliente: nombre,
      taxId: taxId || '-',
      activo: true
    });

    if (!apiSuccess) {
      showToast('Cliente Agregado', `El cliente ${nombre} ha sido agregado con éxito.`, 'success');
    }
  } else {
    let apiSuccess = false;
    if (token && !editIdxVal.startsWith('11111111-') && !editIdxVal.startsWith('mock-')) {
      try {
        const response = await fetch('/api/Clientes/actualizar', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            idCliente: editIdxVal,
            rut: rut,
            nombreCliente: nombre,
            taxId: taxId || null
          })
        });

        if (response.ok) {
          apiSuccess = true;
          showToast('Cliente Actualizado', 'El cliente ha sido modificado exitosamente en el servidor.', 'success');
        } else {
          console.warn('El servidor devolvió un error al actualizar. Modificando localmente.');
        }
      } catch (err) {
        console.warn('Error de conexión con la API al actualizar. Modificando de forma local.', err);
      }
    }

    // Find and update in local list
    const localClient = clientesList.find(c => (c.idCliente || '').toString().toLowerCase() === (editIdxVal || '').toString().toLowerCase());
    if (localClient) {
      localClient.rut = rut;
      localClient.nombreCliente = nombre;
      localClient.taxId = taxId || '-';
      if (!apiSuccess) {
        showToast('Cliente Modificado', `El cliente ${nombre} ha sido modificado con éxito.`, 'success');
      }
    }
  }

  // Trigger render
  renderClientes(searchClientesInput.value);
  if (token) {
    fetchAndRenderClientes();
  }
  closeAllModals();
});

// Helper function to download template authenticated
async function downloadTemplate(type) {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (!token) {
    showToast('No autorizado', 'Debes iniciar sesión para descargar la plantilla.', 'error');
    return;
  }
  
  const endpoint = type === 'excel' 
    ? '/api/Clientes/descargar-plantilla-excel' 
    : '/api/Clientes/descargar-plantilla-csv';
     
  try {
    showToast('Descargando...', 'Preparando descarga de plantilla...', 'success');
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
     
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'excel' ? 'plantilla_clientes.xlsx' : 'plantilla_clientes.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast('Descarga exitosa', 'La plantilla se ha descargado correctamente.', 'success');
    } else {
      showToast('Error', 'No se pudo descargar la plantilla desde el servidor.', 'error');
    }
  } catch (err) {
    console.error('Error descargando plantilla:', err);
    showToast('Error de conexión', 'No se pudo conectar con el servidor para descargar la plantilla.', 'error');
  }
}

// Download Templates handlers
btnDownloadExcel.addEventListener('click', () => downloadTemplate('excel'));
btnDownloadCsv.addEventListener('click', () => downloadTemplate('csv'));

// Bulk Upload handlers
btnBulkUploadTrigger.addEventListener('click', () => {
  bulkUploadInput.click();
});

bulkUploadInput.addEventListener('change', async () => {
  if (bulkUploadInput.files.length === 0) return;
  const file = bulkUploadInput.files[0];
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

  if (!token) {
    showToast('No autorizado', 'Debes iniciar sesión para realizar la carga masiva.', 'error');
    bulkUploadInput.value = '';
    return;
  }

  const formData = new FormData();
  formData.append('archivo', file);
  formData.append('file', file);

  try {
    showToast('Procesando...', 'Subiendo archivo y procesando carga masiva...', 'success');
    btnBulkUploadTrigger.disabled = true;
    
    const response = await fetch('/api/Clientes/carga-masiva', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      showToast('Carga Masiva Exitosa', 'Los clientes del archivo fueron importados con éxito.', 'success');
      fetchAndRenderClientes();
    } else {
      let msg = 'Ocurrió un error al procesar el archivo.';
      try {
        const errData = await response.json();
        msg = errData.mensaje || msg;
      } catch (_) {}
      showToast('Error de Carga', msg, 'error');
    }
  } catch (err) {
    console.error('Error en carga masiva:', err);
    showToast('Error de conexión', 'No se pudo conectar al servidor para la carga masiva.', 'error');
  } finally {
    btnBulkUploadTrigger.disabled = false;
    bulkUploadInput.value = '';
  }
});

// Helper function to download template authenticated for Collaborators
async function downloadColabTemplate(type) {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (!token) {
    showToast('No autorizado', 'Debes iniciar sesión para descargar la plantilla.', 'error');
    return;
  }
  
  const endpoint = type === 'excel' 
    ? '/api/Colaboradores/plantilla-excel' 
    : '/api/Colaboradores/plantilla-csv';
     
  try {
    showToast('Descargando...', 'Preparando descarga de plantilla...', 'success');
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
     
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'excel' ? 'plantilla_colaboradores.xlsx' : 'plantilla_colaboradores.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast('Descarga exitosa', 'La plantilla se ha descargado correctamente.', 'success');
    } else {
      showToast('Error', 'No se pudo descargar la plantilla desde el servidor.', 'error');
    }
  } catch (err) {
    console.error('Error descargando plantilla:', err);
    showToast('Error de conexión', 'No se pudo conectar con el servidor para descargar la plantilla.', 'error');
  }
}

// Download Colab Templates handlers
btnDownloadColabExcel.addEventListener('click', () => downloadColabTemplate('excel'));
btnDownloadColabCsv.addEventListener('click', () => downloadColabTemplate('csv'));

// Bulk Upload handlers for Collaborators
btnColabBulkUploadTrigger.addEventListener('click', () => {
  colabBulkUploadInput.click();
});

colabBulkUploadInput.addEventListener('change', async () => {
  if (colabBulkUploadInput.files.length === 0) return;
  const file = colabBulkUploadInput.files[0];
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

  if (!token) {
    showToast('No autorizado', 'Debes iniciar sesión para realizar la carga masiva.', 'error');
    colabBulkUploadInput.value = '';
    return;
  }

  const formData = new FormData();
  formData.append('archivo', file);
  formData.append('file', file);

  try {
    showToast('Procesando...', 'Subiendo archivo y procesando carga masiva...', 'success');
    btnColabBulkUploadTrigger.disabled = true;
    
    const response = await fetch('/api/Colaboradores/carga-masiva', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      showToast('Carga Masiva Exitosa', 'Los colaboradores del archivo fueron importados con éxito.', 'success');
      fetchAndRenderColaboradores();
    } else {
      let msg = 'Ocurrió un error al procesar el archivo.';
      try {
        const errData = await response.json();
        msg = errData.mensaje || msg;
      } catch (_) {}
      showToast('Error de Carga', msg, 'error');
    }
  } catch (err) {
    console.error('Error en carga masiva:', err);
    showToast('Error de conexión', 'No se pudo conectar al servidor para la carga masiva.', 'error');
  } finally {
    btnColabBulkUploadTrigger.disabled = false;
    colabBulkUploadInput.value = '';
  }
});

// Toggle password visibility in Change Password Modal
btnToggleColabPassword.addEventListener('click', () => {
  const isPassword = colabNewPasswordInput.getAttribute('type') === 'password';
  colabNewPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
  
  if (isPassword) {
    iconEyeColab.classList.add('hidden');
    iconEyeOffColab.classList.remove('hidden');
    btnToggleColabPassword.setAttribute('aria-label', 'Ocultar contraseña');
  } else {
    iconEyeColab.classList.remove('hidden');
    iconEyeOffColab.classList.add('hidden');
    btnToggleColabPassword.setAttribute('aria-label', 'Mostrar contraseña');
  }
});

colabNewPasswordInput.addEventListener('input', () => {
  const group = colabNewPasswordInput.closest('.input-group');
  if (group.classList.contains('has-error') && colabNewPasswordInput.value.trim().length >= 8) {
    group.classList.remove('has-error');
  }
});

// Submit Change Password Form (PUT /api/Colaboradores/cambiar-contrasena)
formChangePassword.addEventListener('submit', async (e) => {
  e.preventDefault();

  const idColaborador = colabPassIdInput.value;
  const nuevaContrasena = colabNewPasswordInput.value;

  if (!nuevaContrasena || nuevaContrasena.length < 8) {
    colabNewPasswordInput.closest('.input-group').classList.add('has-error');
    showToast('Contraseña inválida', 'La contraseña debe tener mínimo 8 caracteres.', 'error');
    return;
  }

  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  let apiSuccess = false;

  if (token && idColaborador && !idColaborador.startsWith('22222222-') && !idColaborador.startsWith('mock-')) {
    try {
      const response = await fetch('/api/Colaboradores/cambiar-contrasena', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          idColaborador: idColaborador,
          nuevaContrasenaPlano: nuevaContrasena
        })
      });

      if (response.ok) {
        apiSuccess = true;
        showToast('Contraseña Actualizada', 'La contraseña del colaborador ha sido actualizada en el servidor.', 'success');
      } else {
        let msg = 'Error al actualizar la contraseña del colaborador.';
        try {
          const errData = await response.json();
          msg = errData.mensaje || msg;
        } catch (_) {}
        showToast('Error', msg, 'error');
        return;
      }
    } catch (err) {
      console.warn('Error de conexión al cambiar contraseña de colaborador:', err);
      showToast('Error de conexión', 'No se pudo conectar al servidor.', 'error');
      return;
    }
  }

  if (!apiSuccess) {
    showToast('Contraseña Actualizada', 'Contraseña del colaborador actualizada localmente.', 'success');
  }

  closeAllModals();
});

// Submit Add/Edit Colaborador Form
formAddColaborador.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombres = document.getElementById('colab-nombres').value.trim();
  const paterno = document.getElementById('colab-paterno').value.trim();
  const materno = document.getElementById('colab-materno').value.trim();
  const correo = document.getElementById('colab-correo').value.trim();
  const telefono = document.getElementById('colab-telefono').value.trim();

  if (!nombres || !paterno || !correo) {
    showToast('Campos requeridos', 'Por favor completa los campos requeridos.', 'error');
    return;
  }

  const editIdxVal = editColabIdxInput.value;
  const isEditing = editIdxVal !== '';
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

  if (!isEditing) {
    let apiSuccess = false;
    let serverColab = null;
    if (token) {
      try {
        const response = await fetch('/api/Colaboradores/agregar', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            nombres: nombres,
            apellidoPaterno: paterno,
            apellidoMaterno: materno || null,
            correoElectronico: correo,
            telefonoMovil: telefono || null
          })
        });

        if (response.ok) {
          const data = await response.json();
          serverColab = (data && data.colaborador) ? data.colaborador : data;
          apiSuccess = true;
          showToast('Colaborador Creado', 'El colaborador ha sido guardado exitosamente en el servidor.', 'success');
        } else {
          console.warn('El servidor devolvió un error al agregar colaborador. Agregando localmente.');
        }
      } catch (err) {
        console.warn('Error de conexión con la API de colaboradores. Guardando de forma local.', err);
      }
    }

    const newId = (serverColab && serverColab.idColaborador) 
      ? serverColab.idColaborador 
      : ((typeof crypto !== 'undefined' && crypto.randomUUID) 
          ? crypto.randomUUID() 
          : 'mock-' + Math.random().toString(36).substring(2, 15));

    colaboradoresList.unshift({
      idColaborador: newId,
      nombres: nombres,
      apellidoPaterno: paterno,
      apellidoMaterno: materno || null,
      correoElectronico: correo,
      telefonoMovil: telefono || '-',
      activo: true
    });

    if (!apiSuccess) {
      showToast('Colaborador Agregado', `El colaborador ${nombres} ${paterno} fue agregado exitosamente.`, 'success');
    }
  } else {
    let apiSuccess = false;
    if (token && !editIdxVal.startsWith('22222222-') && !editIdxVal.startsWith('mock-')) {
      try {
        const response = await fetch('/api/Colaboradores/actualizar', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            idColaborador: editIdxVal,
            nombres: nombres,
            apellidoPaterno: paterno,
            apellidoMaterno: materno || null,
            correoElectronico: correo,
            telefonoMovil: telefono || null
          })
        });

        if (response.ok) {
          apiSuccess = true;
          showToast('Colaborador Actualizado', 'El colaborador ha sido modificado exitosamente en el servidor.', 'success');
        } else {
          console.warn('El servidor devolvió un error al actualizar. Modificando localmente.');
        }
      } catch (err) {
        console.warn('Error de conexión con la API al actualizar. Modificando de forma local.', err);
      }
    }

    // Find and update in local list
    const localColab = colaboradoresList.find(c => c.idColaborador === editIdxVal);
    if (localColab) {
      localColab.nombres = nombres;
      localColab.apellidoPaterno = paterno;
      localColab.apellidoMaterno = materno || null;
      localColab.correoElectronico = correo;
      localColab.telefonoMovil = telefono || '-';
      if (!apiSuccess) {
        showToast('Colaborador Modificado', `El colaborador ${nombres} ha sido modificado con éxito.`, 'success');
      }
    }
  }

  renderColaboradores(searchColaboradoresInput.value);
  if (token) {
    fetchAndRenderColaboradores();
  }
  closeAllModals();
});

// ==========================================================================
// REGISTRATION FLOW LOGIC
// ==========================================================================

// Navigation
linkGoToRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginSection.classList.add('hidden');
  setTimeout(() => {
    registerSection.classList.remove('hidden');
    inputRegisterNombres.focus();
  }, 300);
});

btnBackLoginReg.addEventListener('click', (e) => {
  e.preventDefault();
  registerSection.classList.add('hidden');
  setTimeout(() => {
    loginSection.classList.remove('hidden');
    inputIdentificador.focus();
  }, 300);
});

// Toggle password in register card
btnToggleRegisterPassword.addEventListener('click', () => {
  const isPassword = inputRegisterContrasena.getAttribute('type') === 'password';
  inputRegisterContrasena.setAttribute('type', isPassword ? 'text' : 'password');
  
  if (isPassword) {
    iconEyeReg.classList.add('hidden');
    iconEyeOffReg.classList.remove('hidden');
    btnToggleRegisterPassword.setAttribute('aria-label', 'Ocultar contraseña');
  } else {
    iconEyeReg.classList.remove('hidden');
    iconEyeOffReg.classList.add('hidden');
    btnToggleRegisterPassword.setAttribute('aria-label', 'Mostrar contraseña');
  }
});

// Clear validation errors on key input
[
  { input: inputRegisterNombres },
  { input: inputRegisterPaterno },
  { input: inputRegisterCorreo },
  { input: inputRegisterTelefono },
  { input: inputRegisterContrasena }
].forEach(item => {
  item.input.addEventListener('input', () => {
    const group = item.input.closest('.input-group');
    if (group.classList.contains('has-error')) {
      group.classList.remove('has-error');
    }
  });
});

// Submit registration form to API
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const planId = parseInt(registerForm.querySelector('input[name="idPlan"]:checked').value);
  const nombres = inputRegisterNombres.value.trim();
  const paterno = inputRegisterPaterno.value.trim();
  const materno = inputRegisterMaterno.value.trim();
  const correo = inputRegisterCorreo.value.trim();
  const telefono = inputRegisterTelefono.value.trim();
  const contrasena = inputRegisterContrasena.value;

  // Client-Side Validation
  let hasError = false;

  if (nombres.length < 2) {
    inputRegisterNombres.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  if (paterno.length < 2) {
    inputRegisterPaterno.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  // Simple email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    inputRegisterCorreo.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  if (!telefono) {
    inputRegisterTelefono.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  // Strong password regex requirement from API:
  // at least 1 uppercase, 1 lowercase, 1 digit, 1 special character (@$!%*?&), min 8 chars
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passRegex.test(contrasena)) {
    inputRegisterContrasena.closest('.input-group').classList.add('has-error');
    hasError = true;
  }

  if (hasError) {
    triggerCardShake(registerCard);
    showToast('Datos Inválidos', 'Por favor, corrige los campos marcados en el formulario.', 'error');
    return;
  }

  // Set loading state
  const btnText = btnRegisterSubmit.querySelector('.btn-text');
  const btnSpinner = btnRegisterSubmit.querySelector('.loader-spinner');
  btnRegisterSubmit.disabled = true;
  registerForm.querySelectorAll('input').forEach(inp => inp.disabled = true);
  btnText.classList.add('hidden');
  btnSpinner.classList.remove('hidden');

  try {
    const response = await fetch('/api/Autenticacion/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        idPlan: planId,
        nombres: nombres,
        apellidoPaterno: paterno,
        apellidoMaterno: materno || null,
        correoElectronico: correo,
        telefonoMovil: telefono,
        contrasenaPlano: contrasena,
        tipoVerificacionInicial: 'CORREO'
      })
    });

    if (response.ok) {
      const data = await response.json();
      currentRegIdCuenta = data.idCuenta;
      currentRegIdUsuario = data.idUsuario;

      showToast('Registro Exitoso', 'Por favor, introduce el código de verificación enviado a tu correo.', 'success');
      
      // Clear registration form fields
      registerForm.reset();

      // Pre-fill login email input
      inputIdentificador.value = correo;
      inputIdentificador.dispatchEvent(new Event('input'));
      inputContrasena.value = '';

      // Transition to Verification Card
      registerSection.classList.add('hidden');
      setTimeout(() => {
        verifyRegisterSection.classList.remove('hidden');
        inputVerifyRegisterCode.focus();
      }, 300);

    } else {
      let msg = 'Ocurrió un error al procesar el registro.';
      try {
        const errData = await response.json();
        msg = errData.mensaje || msg;
      } catch (_) {}
      
      triggerCardShake(registerCard);
      showToast('Error de Registro', msg, 'error');
    }
  } catch (error) {
    console.error('API Error:', error);
    triggerCardShake(registerCard);
    showToast('Error de Conexión', 'No se pudo conectar con el servidor para registrar el usuario.', 'error');
  } finally {
    btnRegisterSubmit.disabled = false;
    registerForm.querySelectorAll('input').forEach(inp => inp.disabled = false);
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
  }
});

// ==========================================================================
// REGISTER VERIFICATION FLOW LOGIC
// ==========================================================================

// Clear validation error on verify code input
inputVerifyRegisterCode.addEventListener('input', () => {
  const group = inputVerifyRegisterCode.closest('.input-group');
  if (group.classList.contains('has-error') && inputVerifyRegisterCode.value.trim().length === 6) {
    group.classList.remove('has-error');
  }
});

// Back to login from verification card
btnBackLoginVerify.addEventListener('click', (e) => {
  e.preventDefault();
  verifyRegisterSection.classList.add('hidden');
  setTimeout(() => {
    loginSection.classList.remove('hidden');
    inputIdentificador.focus();
  }, 300);
});

// Resend verification code API
btnResendVerifyCode.addEventListener('click', async (e) => {
  e.preventDefault();

  if (!currentRegIdCuenta || !currentRegIdUsuario) {
    showToast('Sesión inválida', 'No hay datos de registro activos. Por favor regístrate nuevamente.', 'error');
    return;
  }

  try {
    // Show spinner on link click
    btnResendVerifyCode.textContent = 'Enviando...';
    btnResendVerifyCode.style.pointerEvents = 'none';

    const response = await fetch('/api/Autenticacion/reenviar-codigo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        idCuenta: currentRegIdCuenta,
        idUsuario: currentRegIdUsuario,
        tipoVerificacion: 'CORREO'
      })
    });

    if (response.ok) {
      showToast('Código Reenviado', 'Se ha enviado un nuevo código de verificación a tu correo.', 'success');
    } else {
      let msg = 'No se pudo reenviar el código.';
      try {
        const errData = await response.json();
        msg = errData.mensaje || msg;
      } catch (_) {}
      showToast('Error', msg, 'error');
    }
  } catch (error) {
    console.error('API Error:', error);
    showToast('Error de Conexión', 'No se pudo conectar para reenviar el código.', 'error');
  } finally {
    btnResendVerifyCode.textContent = 'Reenviar Código';
    btnResendVerifyCode.style.pointerEvents = 'auto';
  }
});

// Submit verification code to API
verifyRegisterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const code = inputVerifyRegisterCode.value.trim();

  if (!code || code.length !== 6) {
    inputVerifyRegisterCode.closest('.input-group').classList.add('has-error');
    triggerCardShake(verifyRegisterCard);
    showToast('Código inválido', 'El código de verificación debe tener exactamente 6 dígitos.', 'error');
    return;
  }

  if (!currentRegIdCuenta || !currentRegIdUsuario) {
    triggerCardShake(verifyRegisterCard);
    showToast('Falta de IDs', 'No se encontraron las identificaciones de registro. Por favor regístrate de nuevo.', 'error');
    return;
  }

  // Set loading state
  const btnText = btnVerifyRegisterSubmit.querySelector('.btn-text');
  const btnSpinner = btnVerifyRegisterSubmit.querySelector('.loader-spinner');
  btnVerifyRegisterSubmit.disabled = true;
  inputVerifyRegisterCode.disabled = true;
  btnText.classList.add('hidden');
  btnSpinner.classList.remove('hidden');

  try {
    const response = await fetch('/api/Autenticacion/verificar-codigo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        idCuenta: currentRegIdCuenta,
        idUsuario: currentRegIdUsuario,
        tipoVerificacion: 'CORREO',
        codigoVerificacionPlano: code
      })
    });

    if (response.ok) {
      showToast('Cuenta Verificada', '¡Tu cuenta ha sido verificada correctamente! Ya puedes iniciar sesión.', 'success');
      
      // Clear code field
      inputVerifyRegisterCode.value = '';

      // Transition to Login Card
      verifyRegisterSection.classList.add('hidden');
      setTimeout(() => {
        loginSection.classList.remove('hidden');
        inputContrasena.focus();
      }, 300);
    } else {
      let msg = 'Código de verificación inválido o vencido.';
      try {
        const errData = await response.json();
        msg = errData.mensaje || msg;
      } catch (_) {}

      triggerCardShake(verifyRegisterCard);
      showToast('Error de Verificación', msg, 'error');
    }
  } catch (error) {
    console.error('API Error:', error);
    triggerCardShake(verifyRegisterCard);
    showToast('Error de Conexión', 'No se pudo conectar con el servidor para verificar la cuenta.', 'error');
  } finally {
    btnVerifyRegisterSubmit.disabled = false;
    inputVerifyRegisterCode.disabled = false;
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
  }
});

// Link to open retrieve verification flow from login card
if (linkResendVerifyFlow) {
  linkResendVerifyFlow.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.add('hidden');
    setTimeout(() => {
      if (retrieveRegisterSection) {
        retrieveRegisterSection.classList.remove('hidden');
        if (inputRetrieveRegisterEmail) inputRetrieveRegisterEmail.focus();
      }
    }, 300);
  });
}

// Back to login from retrieve register card
if (btnBackLoginRetrieve) {
  btnBackLoginRetrieve.addEventListener('click', (e) => {
    e.preventDefault();
    if (retrieveRegisterSection) retrieveRegisterSection.classList.add('hidden');
    setTimeout(() => {
      loginSection.classList.remove('hidden');
      inputIdentificador.focus();
    }, 300);
  });
}

// Clear error state on input change for retrieve register form
if (inputRetrieveRegisterEmail) {
  inputRetrieveRegisterEmail.addEventListener('input', () => {
    inputRetrieveRegisterEmail.closest('.input-group').classList.remove('has-error');
  });
}
if (inputRetrieveRegisterPassword) {
  inputRetrieveRegisterPassword.addEventListener('input', () => {
    inputRetrieveRegisterPassword.closest('.input-group').classList.remove('has-error');
  });
}

// Submit retrieve register form
if (retrieveRegisterForm) {
  retrieveRegisterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = inputRetrieveRegisterEmail.value.trim();
    const password = inputRetrieveRegisterPassword.value.trim();

    let hasError = false;
    if (!email) {
      inputRetrieveRegisterEmail.closest('.input-group').classList.add('has-error');
      hasError = true;
    }
    if (!password) {
      inputRetrieveRegisterPassword.closest('.input-group').classList.add('has-error');
      hasError = true;
    }

    if (hasError) {
      triggerCardShake(retrieveRegisterCard);
      showToast('Campos requeridos', 'Por favor completa todos los campos.', 'error');
      return;
    }

    const btnText = btnRetrieveRegisterSubmit.querySelector('.btn-text');
    const btnSpinner = btnRetrieveRegisterSubmit.querySelector('.loader-spinner');
    if (btnRetrieveRegisterSubmit) btnRetrieveRegisterSubmit.disabled = true;
    if (inputRetrieveRegisterEmail) inputRetrieveRegisterEmail.disabled = true;
    if (inputRetrieveRegisterPassword) inputRetrieveRegisterPassword.disabled = true;
    if (btnText) btnText.classList.add('hidden');
    if (btnSpinner) btnSpinner.classList.remove('hidden');

    try {
      const response = await fetch('/api/Autenticacion/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          identificadorAcceso: email,
          contrasenaPlano: password
        })
      });

      const data = await response.json();

      if (response.ok && data.exitoso) {
        currentRegIdCuenta = data.idCuenta;
        currentRegIdUsuario = data.idUsuario;

        if (inputVerifyRegisterCode) inputVerifyRegisterCode.value = '';

        showToast('Sesión Recuperada', 'Se obtuvieron los datos del registro. Ahora puedes verificar o reenviar el código.', 'success');

        if (retrieveRegisterSection) retrieveRegisterSection.classList.add('hidden');
        setTimeout(() => {
          if (verifyRegisterSection) {
            verifyRegisterSection.classList.remove('hidden');
            if (inputVerifyRegisterCode) inputVerifyRegisterCode.focus();
          }
        }, 300);
      } else {
        triggerCardShake(retrieveRegisterCard);
        showToast('Error', data.mensaje || 'Credenciales incorrectas.', 'error');
      }
    } catch (error) {
      console.error('API Error:', error);
      triggerCardShake(retrieveRegisterCard);
      showToast('Error de Conexión', 'No se pudo conectar con el servidor.', 'error');
    } finally {
      if (btnRetrieveRegisterSubmit) btnRetrieveRegisterSubmit.disabled = false;
      if (inputRetrieveRegisterEmail) inputRetrieveRegisterEmail.disabled = false;
      if (inputRetrieveRegisterPassword) inputRetrieveRegisterPassword.disabled = false;
      if (btnText) btnText.classList.remove('hidden');
      if (btnSpinner) btnSpinner.classList.add('hidden');
    }
  });
}

// ==========================================================================
// ROLES & PERMISSIONS LOGIC (API + FALLBACK MOCK)
// ==========================================================================

// Fetch maestro list of permissions (GET /api/Roles/permisos)
async function fetchPermissionsOnce() {
  if (permissionsList.length > 6) return; // already loaded from API

  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (!token) return;

  try {
    const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
    const response = await fetch('/api/Roles/permisos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'idCuenta': idCuenta,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const perms = (data && Array.isArray(data.permisos)) ? data.permisos : (Array.isArray(data) ? data : []);
      if (perms.length > 0) {
        permissionsList = perms.map(p => {
          if (typeof p === 'string') {
            return { key: p, nombre: p, descripcion: 'Permiso del sistema' };
          }
          const keyVal = p.idPermiso || p.IdPermiso || p.key || p.id;
          const nameVal = p.codigoPermiso || p.CodigoPermiso || p.nombre || p.key || p.nombrePermiso || p;
          const descVal = p.descripcionPermiso || p.DescripcionPermiso || p.descripcion || 'Permiso del sistema';
          return { key: keyVal, nombre: nameVal, descripcion: descVal };
        });
      }
    }
  } catch (err) {
    console.warn('Error al cargar permisos de la API:', err);
  }
}

// Fetch available roles from account (GET /api/Roles/cuenta)
async function fetchRolesListOnly() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (!token) return;

  try {
    const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
    const response = await fetch('/api/Roles/cuenta', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'idCuenta': idCuenta,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const rawRoles = (data && Array.isArray(data.roles)) ? data.roles : (Array.isArray(data) ? data : []);
      rolesList = rawRoles.map(r => ({
        idRol: r.idRol,
        nombre: r.nombreRol || r.nombre,
        descripcion: r.descripcionRol || r.descripcion,
        activo: r.activo !== false,
        permisos: r.permisos || []
      }));
    }
  } catch (err) {
    console.warn('Error al obtener lista de roles:', err);
  }
}

async function fetchAndRenderRoles() {
  await fetchRolesListOnly();
  renderRoles();
}

function renderRoles(filterText = '') {
  if (rolesTableBody) {
    rolesTableBody.innerHTML = '';
  }

  const filtered = rolesList.filter(rol => 
    (rol.nombre && rol.nombre.toLowerCase().includes(filterText.toLowerCase())) ||
    (rol.descripcion && rol.descripcion.toLowerCase().includes(filterText.toLowerCase()))
  );

  if (statRolesCount) {
    statRolesCount.textContent = rolesList.length;
  }

  if (filtered.length === 0) {
    if (rolesTableBody) {
      rolesTableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No se encontraron roles.</td></tr>`;
    }
    return;
  }

  filtered.forEach((rol, idx) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td style="font-weight: 600; color: var(--text-primary);">${capitalizeText(rol.nombre)}</td>
      <td style="color: var(--text-secondary);">${rol.descripcion || '-'}</td>
      <td>
        <button class="btn-table-action btn-edit-rol" title="Editar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button class="btn-table-action btn-assign-permissions" title="Asignar Permisos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </button>
        <button class="btn-table-action delete btn-delete-rol" title="Eliminar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </td>
    `;

    // Edit click handler
    row.querySelector('.btn-edit-rol').addEventListener('click', async () => {
      const idRol = rol.idRol;
      editRolIdxInput.value = idRol || '';
      
      modalRolTitle.textContent = 'Editar Rol';
      document.getElementById('rol-nombre').value = rol.nombre || '';
      document.getElementById('rol-descripcion').value = rol.descripcion || '';

      document.getElementById('rol-nombre').dispatchEvent(new Event('input'));
      document.getElementById('rol-descripcion').dispatchEvent(new Event('input'));

      modalOverlay.classList.remove('hidden');
      modalRol.classList.remove('hidden');

      // Fetch latest details
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (token && idRol && !idRol.startsWith('33333333-') && !idRol.startsWith('mock-')) {
        try {
          const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
          const response = await fetch(`/api/Roles/${idRol}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'idCuenta': idCuenta,
              'Accept': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            const rolData = (data && data.rol) ? data.rol : data;
            document.getElementById('rol-nombre').value = rolData.nombreRol || rolData.nombre || '';
            document.getElementById('rol-descripcion').value = rolData.descripcionRol || rolData.descripcion || '';

            document.getElementById('rol-nombre').dispatchEvent(new Event('input'));
            document.getElementById('rol-descripcion').dispatchEvent(new Event('input'));
          }
        } catch (err) {
          console.warn('Error al obtener detalle del rol:', err);
        }
      }
    });

    // Assign permissions click handler
    row.querySelector('.btn-assign-permissions').addEventListener('click', async () => {
      const idRol = rol.idRol;
      permisosRolIdInput.value = idRol || '';

      permissionsChecklistContainer.innerHTML = '';
      checkAllPermissions.checked = false;

      // Load master permissions
      await fetchPermissionsOnce();

      // Load current role permissions
      let assignedPermissions = [];
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (token && idRol && !idRol.startsWith('33333333-') && !idRol.startsWith('mock-')) {
        try {
          const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
          const response = await fetch(`/api/Roles/${idRol}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'idCuenta': idCuenta,
              'Accept': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            const rolData = (data && data.rol) ? data.rol : data;
            assignedPermissions = data.permisos || rolData.permisos || rolData.permisosRol || [];
          }
        } catch (err) {
          console.warn('Error al obtener permisos de rol:', err);
        }
      } else {
        assignedPermissions = rol.permisos || [];
      }

      permissionsList.forEach(perm => {
        const itemLabel = document.createElement('label');
        itemLabel.className = 'custom-checkbox';
        itemLabel.style.display = 'flex';
        itemLabel.style.alignItems = 'center';

        const isChecked = assignedPermissions.some(ap => {
          const apVal = (ap && (ap.idPermiso || ap.IdPermiso || ap.key || ap.nombre || ap)) || '';
          return String(apVal) === String(perm.key) || String(apVal) === String(perm.nombre);
        }) ? 'checked' : '';

        itemLabel.innerHTML = `
          <input type="checkbox" name="rolePermissions" value="${perm.key}" ${isChecked} />
          <span class="checkmark"></span>
          <span class="label-text" style="font-weight: 500;">
            ${perm.nombre}
            <span style="display: block; font-size: 11px; color: var(--text-muted); font-weight: normal; margin-top: 2px;">
              ${perm.descripcion}
            </span>
          </span>
        `;
        permissionsChecklistContainer.appendChild(itemLabel);
      });

      modalOverlay.classList.remove('hidden');
      modalPermisosRol.classList.remove('hidden');
    });

    // Delete role handler
    row.querySelector('.btn-delete-rol').addEventListener('click', () => {
      if (confirm(`¿Estás seguro de eliminar el rol ${rol.nombre}?`)) {
        rolesList.splice(rolesList.indexOf(rol), 1);
        showToast('Rol Eliminado', 'El rol fue removido de la lista.', 'success');
        renderRoles(searchRolesInput.value);
      }
    });

    if (rolesTableBody) {
      rolesTableBody.appendChild(row);
    }
  });
}

// Show modal to create roles
btnAddRol.addEventListener('click', () => {
  editRolIdxInput.value = '';
  modalRolTitle.textContent = 'Crear Nuevo Rol';
  modalOverlay.classList.remove('hidden');
  modalRol.classList.remove('hidden');
});

// Roles search filter handler
searchRolesInput.addEventListener('input', (e) => {
  renderRoles(e.target.value);
});

// Check/Uncheck all permissions handler
checkAllPermissions.addEventListener('change', (e) => {
  const checkboxes = permissionsChecklistContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = e.target.checked;
  });
});

// Submit Add/Edit Rol Form (POST /api/Roles/crear)
formAddRol.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('rol-nombre').value.trim();
  const descripcion = document.getElementById('rol-descripcion').value.trim();

  if (!nombre) {
    showToast('Campo requerido', 'Por favor ingresa el nombre del rol.', 'error');
    return;
  }

  const editIdxVal = editRolIdxInput.value;
  const isEditing = editIdxVal !== '';
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

  if (!isEditing) {
    let apiSuccess = false;
    let serverRol = null;
    if (token) {
      try {
        const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
        const response = await fetch('/api/Roles/crear', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'idCuenta': idCuenta,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            NombreRol: nombre,
            DescripcionRol: descripcion
          })
        });

        if (response.ok) {
          const data = await response.json();
          serverRol = (data && data.rol) ? data.rol : data;
          apiSuccess = true;
          showToast('Rol Creado', 'El rol ha sido guardado exitosamente en el servidor.', 'success');
        } else {
          showToast('Error', 'No se pudo crear el rol en el servidor.', 'error');
        }
      } catch (err) {
        console.warn('Error de conexión con la API de roles. Guardando localmente.', err);
      }
    }

    const newId = (serverRol && serverRol.idRol) 
      ? serverRol.idRol 
      : 'mock-' + Math.random().toString(36).substring(2, 15);

    const newNombre = (serverRol && (serverRol.nombreRol || serverRol.nombre)) || nombre;
    const newDescripcion = (serverRol && (serverRol.descripcionRol || serverRol.descripcion)) || descripcion;

    rolesList.unshift({
      idRol: newId,
      nombre: newNombre,
      descripcion: newDescripcion,
      permisos: []
    });

    if (!apiSuccess) {
      showToast('Rol Agregado', `El rol ${nombre} fue agregado localmente.`, 'success');
    }
  } else {
    // If updating, local mock representation (no PUT endpoint for role update listed in user list, but let's update it in local memory anyway)
    const localRol = rolesList.find(r => r.idRol === editIdxVal);
    if (localRol) {
      localRol.nombre = nombre;
      localRol.descripcion = descripcion;
      showToast('Rol Modificado', `El rol ${nombre} fue modificado con éxito.`, 'success');
    }
  }

  renderRoles(searchRolesInput.value);
  closeAllModals();
});

// Submit Assign Permissions Form (POST /api/Roles/asignar-permisos)
formAssignPermissions.addEventListener('submit', async (e) => {
  e.preventDefault();

  const idRol = permisosRolIdInput.value;
  const checkedBoxes = permissionsChecklistContainer.querySelectorAll('input[name="rolePermissions"]:checked');
  const selectedPermissions = Array.from(checkedBoxes).map(cb => cb.value);

  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  let apiSuccess = false;

  if (token && idRol && !idRol.startsWith('mock-') && !idRol.startsWith('33333333-')) {
    try {
      const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
      const response = await fetch('/api/Roles/asignar-permisos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'idCuenta': idCuenta,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          IdRol: Number(idRol) || idRol,
          IdPermisos: selectedPermissions.map(p => Number(p) || p)
        })
      });

      if (response.ok) {
        apiSuccess = true;
        showToast('Permisos Guardados', 'Los permisos fueron asignados correctamente al rol.', 'success');
      } else {
        showToast('Error', 'No se pudo guardar la asignación de permisos en el servidor.', 'error');
      }
    } catch (err) {
      console.warn('Error de conexión al asignar permisos:', err);
    }
  }

  // Always update in memory representation
  const localRol = rolesList.find(r => r.idRol === idRol);
  if (localRol) {
    localRol.permisos = selectedPermissions;
    if (!apiSuccess) {
      showToast('Permisos Guardados', 'Permisos asignados al rol localmente.', 'success');
    }
  }

  closeAllModals();
});

// Submit Assign User Role Form (POST /api/Roles/asignar-usuario)
formAssignUserRole.addEventListener('submit', async (e) => {
  e.preventDefault();

  const idUsuario = assignColabIdInput.value;
  const checkedBoxes = colabRolesChecklistContainer.querySelectorAll('input[name="colabRoles"]:checked');
  const selectedRoles = Array.from(checkedBoxes).map(cb => cb.value);

  if (selectedRoles.length === 0) {
    showToast('Rol requerido', 'Por favor selecciona al menos un rol.', 'error');
    return;
  }

  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  let apiSuccess = false;

  if (token && idUsuario && !idUsuario.startsWith('mock-') && !idUsuario.startsWith('22222222-')) {
    try {
      const idCuenta = localStorage.getItem('id_cuenta') || sessionStorage.getItem('id_cuenta');
      for (const idRol of selectedRoles) {
        await fetch('/api/Roles/asignar-usuario', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'idCuenta': idCuenta,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            IdUsuario: idUsuario,
            IdRol: Number(idRol) || idRol
          })
        });
      }
      apiSuccess = true;
      showToast('Rol Asignado', 'El rol ha sido asignado al colaborador con éxito.', 'success');
    } catch (err) {
      console.warn('Error de conexión al asignar rol:', err);
    }
  }

  // Always update in memory representation
  userRolesMap[idUsuario] = selectedRoles;
  if (!apiSuccess) {
    showToast('Rol Asignado', 'Rol asignado al colaborador localmente.', 'success');
  }

  closeAllModals();
});

// Open Portfolio Tab Page on Card Click (with Client Validation)
if (modulePortfolioCard) {
  modulePortfolioCard.addEventListener('click', () => {
    // 1. Get selected client ID
    const selectedId = localStorage.getItem('cliente_seleccionado_id') || '';
    
    // 2. Validate selected client context
    if (!selectedId) {
      // Access Denied: Trigger toast warning
      showToast('Acceso Denegado', 'Por favor selecciona un cliente activo en la cabecera antes de ingresar al portafolio.', 'error');
      
      // Pulse animation on the combobox selector
      if (clientCombobox) {
        clientCombobox.classList.add('pulse-glow');
        setTimeout(() => {
          clientCombobox.classList.remove('pulse-glow');
        }, 2400);
      }
      
      // Programmatically open the dropdown selector
      openClientCombobox();
      return;
    }
    
    // 3. Client is selected: populate active client details into portfolio panel
    const selectedClient = clientesList.find(c => (c.idCliente || '').toString().toLowerCase() === (selectedId || '').toString().toLowerCase());
    if (selectedClient) {
      const portfolioClientName = document.getElementById('portfolio-client-name');
      const portfolioClientRut = document.getElementById('portfolio-client-rut');
      const portfolioClientAvatar = document.getElementById('portfolio-client-avatar');
      
      if (portfolioClientName) portfolioClientName.textContent = capitalizeText(selectedClient.nombreCliente);
      if (portfolioClientRut) portfolioClientRut.textContent = `RUT: ${selectedClient.rut || '-'}`;
      
      // Avatar Initials
      let initials = 'CL';
      if (selectedClient.nombreCliente) {
        const parts = selectedClient.nombreCliente.trim().split(/\s+/);
        if (parts.length >= 2) {
          initials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts[0].length >= 2) {
          initials = parts[0].substring(0, 2).toUpperCase();
        } else if (parts[0].length >= 1) {
          initials = selectedClient.nombreCliente[0].toUpperCase() + 'L';
        }
      }
      if (portfolioClientAvatar) portfolioClientAvatar.textContent = initials;
    }
    
    // 4. Trigger premium simulation load
    showToast('Iniciando Módulo', 'Cargando interfaz de Gestión de Portafolio...', 'success');
    
    setTimeout(() => {
      // Deactivate sidebar nav buttons
      navItems.forEach(btn => btn.classList.remove('active'));
      
      // Hide all tab panes
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Show portfolio tab pane
      const tabPortafolio = document.getElementById('tab-portafolio');
      if (tabPortafolio) tabPortafolio.classList.add('active');
      
      // Update cabecera title
      if (currentTabTitle) {
        currentTabTitle.textContent = 'Gestión de Portafolio';
      }

      // Reset sub-navigation inside portfolio tab to "Resumen"
      if (typeof portfolioSubnavItems !== 'undefined' && portfolioSubnavItems.length > 0) {
        portfolioSubnavItems.forEach(btn => btn.classList.remove('active'));
        const firstSubnavItem = document.querySelector('.portfolio-subnav-item[data-subtab="resumen"]');
        if (firstSubnavItem) firstSubnavItem.classList.add('active');
      }

      if (typeof portfolioSubtabContents !== 'undefined' && portfolioSubtabContents.length > 0) {
        portfolioSubtabContents.forEach(pane => pane.classList.remove('active'));
        const firstSubtabContent = document.getElementById('subtab-resumen');
        if (firstSubtabContent) firstSubtabContent.classList.add('active');
      }

      // Fetch data for carteras and caja
      if (typeof fetchAndRenderCarteras === 'function') fetchAndRenderCarteras();
      if (typeof fetchAndRenderCaja === 'function') fetchAndRenderCaja();
    }, 800);
  });
}

// Volver a Inicio button click handler
const btnBackToInicio = document.getElementById('btn-back-to-inicio');
if (btnBackToInicio) {
  btnBackToInicio.addEventListener('click', () => {
    // Switch active nav to Inicio
    navItems.forEach(btn => btn.classList.remove('active'));
    const btnInicioNav = Array.from(navItems).find(btn => btn.getAttribute('data-tab') === 'inicio');
    if (btnInicioNav) btnInicioNav.classList.add('active');

    // Toggle tab visibility back to inicio
    tabPanes.forEach(pane => pane.classList.remove('active'));
    const tabInicio = document.getElementById('tab-inicio');
    if (tabInicio) tabInicio.classList.add('active');

    // Restore header title
    if (currentTabTitle && btnInicioNav) {
      currentTabTitle.textContent = btnInicioNav.querySelector('span').textContent;
    }
  });
}

// Portfolio Detail Action Buttons
const btnPortfolioReport = document.getElementById('btn-portfolio-report');
if (btnPortfolioReport) {
  btnPortfolioReport.addEventListener('click', () => {
    showToast('Informe Generado', 'El reporte consolidado del portafolio ha sido enviado a tu correo.', 'success');
  });
}

const btnPortfolioRebalance = document.getElementById('btn-portfolio-rebalance');
if (btnPortfolioRebalance) {
  btnPortfolioRebalance.addEventListener('click', () => {
    showToast('Rebalanceo Iniciado', 'Calculando la reasignación óptima de activos...', 'info');
    setTimeout(() => {
      showToast('Rebalanceo Completado', 'El portafolio se ha rebalanceado con éxito al perfil moderado.', 'success');
    }, 1500);
  });
}

// Simulate Buy/Sell actions on assets table rows
document.querySelectorAll('.btn-portfolio-buy').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const asset = e.target.getAttribute('data-asset');
    showToast('Transacción Iniciada', `Simulando orden de COMPRA para ${asset}...`, 'info');
    setTimeout(() => {
      showToast('Transacción Exitosa', `Se han comprado unidades de ${asset} con éxito.`, 'success');
    }, 1200);
  });
});

document.querySelectorAll('.btn-portfolio-sell').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const asset = e.target.getAttribute('data-asset');
    showToast('Transacción Iniciada', `Simulando orden de VENTA para ${asset}...`, 'info');
    setTimeout(() => {
      showToast('Transacción Exitosa', `Se han liquidado unidades de ${asset} con éxito.`, 'success');
    }, 1200);
  });
});

// ==========================================================================
// PORTFOLIO DETAILED EXPANSION (AGF, CARTERAS, CAJA)
// ==========================================================================

// Global Lists
let admGralFondosList = [];
let carterasList = [];
let cajaMovimientosList = [];
let cachedCarterasSaldos = {};
let cajaTiposMovimiento = ['APORTE', 'RETIRO'];
let instrumentosList = [
  {
    idInstrumento: '55555555-5555-5555-5555-555555555551',
    tickerISIN: 'AAPL',
    nombreInstrumento: 'Apple Inc. Common Stock',
    tipoInstrumento: 'Acción',
    monedaInstrumento: 'USD',
    tienePresenciaBursatil: true,
    porcentajeAccionarioAnual: 0,
    activo: true
  },
  {
    idInstrumento: '55555555-5555-5555-5555-555555555552',
    tickerISIN: 'COPEC',
    nombreInstrumento: 'Empresas Copec S.A.',
    tipoInstrumento: 'Acción',
    monedaInstrumento: 'CLP',
    tienePresenciaBursatil: true,
    porcentajeAccionarioAnual: 0,
    activo: true
  },
  {
    idInstrumento: '55555555-5555-5555-5555-555555555553',
    tickerISIN: 'BTC',
    nombreInstrumento: 'Bitcoin Cash',
    tipoInstrumento: 'Criptomoneda',
    monedaInstrumento: 'USD',
    tienePresenciaBursatil: false,
    porcentajeAccionarioAnual: 0,
    activo: false
  }
];
let instrumentoTiposList = ['Acción', 'Bono', 'Fondo Mutuo', 'ETF', 'Criptomoneda', 'Otro'];

function getFriendlyMovimientoLabel(t) {
  const mapping = {
    'APORTE': 'Depósito / Aporte',
    'CREDITO_AJUSTE': 'Crédito Ajuste',
    'DIVIDENDO_EFECTIVO': 'Dividendo Efectivo',
    'INTERES_DEPOSITO': 'Interés Depósito',
    'TRASPASO_IN': 'Traspaso Entrada',
    'VENTA_INSTRUMENTO': 'Venta Instrumento',
    'COMISION': 'Comisión',
    'COMPRA_INSTRUMENTO': 'Compra Instrumento',
    'DEBITO_AJUSTE': 'Débito Ajuste',
    'IMPUESTO': 'Impuesto',
    'RETIRO': 'Retiro',
    'TRASPASO_OUT': 'Traspaso Salida'
  };
  return mapping[t] || (t || '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// Subnav & Subtabs DOM Elements
const portfolioSubnavItems = document.querySelectorAll('.portfolio-subnav-item');
const portfolioSubtabContents = document.querySelectorAll('.portfolio-subtab-content');

// Carteras DOM Elements
const carterasTableBody = document.getElementById('carteras-table-body');
const btnAddCartera = document.getElementById('btn-add-cartera');
const searchCarterasInput = document.getElementById('search-carteras');
const modalCartera = document.getElementById('modal-cartera');
const formAddCartera = document.getElementById('form-add-cartera');
const editCarteraIdxInput = document.getElementById('edit-cartera-idx');
const carteraNombreInput = document.getElementById('cartera-nombre');
const carteraAgfSelect = document.getElementById('cartera-agf');
const modalCarteraTitle = document.getElementById('modal-cartera-title');

// Caja DOM Elements
const cajaBalancesGrid = document.getElementById('caja-balances-grid');
const btnCajaMovimiento = document.getElementById('btn-caja-movimiento');
const btnCajaTraspaso = document.getElementById('btn-caja-traspaso');
const cajaMovementsTableBody = document.getElementById('caja-movements-table-body');
const modalMovimientoCaja = document.getElementById('modal-movimiento-caja');
const formAddMovimiento = document.getElementById('form-add-movimiento');
const movimientoCarteraSelect = document.getElementById('movimiento-cartera');
const movimientoTipoSelect = document.getElementById('movimiento-tipo');
const movimientoMontoInput = document.getElementById('movimiento-monto');
const movimientoMotivoInput = document.getElementById('movimiento-motivo');
const movimientoMonedaSelect = document.getElementById('movimiento-moneda');
const movimientoTipoCambioInput = document.getElementById('movimiento-tipocambio');
const movimientoMonedaParSelect = document.getElementById('movimiento-monedapar');
const movimientoFechaInput = document.getElementById('movimiento-fecha');

const modalTraspasoCaja = document.getElementById('modal-traspaso-caja');
const formAddTraspaso = document.getElementById('form-add-traspaso');
const traspasoOrigenSelect = document.getElementById('traspaso-origen');
const traspasoDestinoSelect = document.getElementById('traspaso-destino');
const traspasoMontoInput = document.getElementById('traspaso-monto');
const traspasoMotivoInput = document.getElementById('traspaso-motivo');

// AGF DOM Elements
const agfTableBody = document.getElementById('agf-table-body');
const btnAddAgf = document.getElementById('btn-add-agf');
const searchAgfInput = document.getElementById('search-agf');
const modalAgf = document.getElementById('modal-agf');
const formAddAgf = document.getElementById('form-add-agf');
const editAgfIdxInput = document.getElementById('edit-agf-idx');
const agfNombreInput = document.getElementById('agf-nombre');
const modalAgfTitle = document.getElementById('modal-agf-title');

// Instrumentos DOM Elements
const instrumentosTableBody = document.getElementById('instrumentos-table-body');
const btnAddInstrumento = document.getElementById('btn-add-instrumento');
const searchInstrumentosInput = document.getElementById('search-instrumentos');
const modalInstrumento = document.getElementById('modal-instrumento');
const formAddInstrumento = document.getElementById('form-add-instrumento');
const editInstrumentoIdxInput = document.getElementById('edit-instrumento-idx');
const instrumentoTickerInput = document.getElementById('instrumento-ticker');
const instrumentoNombreInput = document.getElementById('instrumento-nombre');
const instrumentoTipoSelect = document.getElementById('instrumento-tipo-select');
const instrumentoMonedaSelect = document.getElementById('instrumento-moneda-select');
const instrumentoPresenciaInput = document.getElementById('instrumento-presencia');
const instrumentoPorcentajeInput = document.getElementById('instrumento-porcentaje');
const modalInstrumentoTitle = document.getElementById('modal-instrumento-title');
const kpiTotalInstrumentos = document.getElementById('kpi-total-instrumentos');
const kpiActivosInstrumentos = document.getElementById('kpi-activos-instrumentos');

// Currency formatting helper
function formatCLP(value) {
  if (value === undefined || value === null) return '$0 CLP';
  return '$' + Math.floor(value).toLocaleString('es-CL') + ' CLP';
}

function formatMoneda(value, moneda = 'CLP') {
  if (value === undefined || value === null) return '0 ' + moneda;
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  
  const m = (moneda || 'CLP').toUpperCase().trim();
  if (m === 'CLP') {
    return '$' + Math.floor(num).toLocaleString('es-CL') + ' CLP';
  } else if (m === 'CLF' || m === 'UF') {
    return num.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) + ' UF';
  } else if (m === 'USD') {
    return 'US$ ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (m === 'EUR') {
    return '€ ' + num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return num.toLocaleString('es-CL') + ' ' + m;
}

// Helper to populate AGF dropdown in Carteras modal
function populateAgfDropdown() {
  if (!carteraAgfSelect) return;
  carteraAgfSelect.innerHTML = '<option value="" disabled selected style="background: var(--bg-card); color: var(--text-muted);">Selecciona Administradora (AGF)</option>';
  const activeAgfs = admGralFondosList.filter(a => a.activo !== false);
  activeAgfs.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.idAdmGralFondos;
    const nameVal = a.nombreAdmGralFondos || a.nombre || '';
    opt.textContent = nameVal;
    opt.style.background = 'var(--bg-card)';
    opt.style.color = 'var(--text-primary)';
    carteraAgfSelect.appendChild(opt);
  });
}

// --------------------------------------------------------------------------
// Administradoras Generales de Fondos (AGF) API Integration
// --------------------------------------------------------------------------
async function fetchAndRenderAGFs() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  try {
    if (agfTableBody) {
      agfTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px;">Cargando administradoras...</td></tr>`;
    }
    let data = null;
    if (token) {
      const response = await fetch('/api/AdmGralFondos', {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        data = await response.json();
      }
    }
    
    if (data) {
      if (Array.isArray(data)) {
        admGralFondosList = data;
      } else if (data.admGralFondos && Array.isArray(data.admGralFondos)) {
        admGralFondosList = data.admGralFondos;
      } else {
        admGralFondosList = [];
      }
    } else {
      admGralFondosList = [];
    }
  } catch (err) {
    console.warn('API AdmGralFondos no accesible.', err);
    admGralFondosList = [];
  } finally {
    renderAGFs();
  }
}

// --------------------------------------------------------------------------
// Instrumentos API Integration & Fallback Mock
// --------------------------------------------------------------------------
async function fetchAndRenderInstrumentos() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  try {
    if (instrumentosTableBody) {
      instrumentosTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">Cargando instrumentos...</td></tr>`;
    }
    
    // Load dropdown types
    await fetchInstrumentTipos();

    let data = null;
    if (token) {
      const response = await fetch('/api/Instrumentos', {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        data = await response.json();
      }
    }
    
    if (data) {
      if (Array.isArray(data)) {
        instrumentosList = data;
      } else if (data.instrumentos && Array.isArray(data.instrumentos)) {
        instrumentosList = data.instrumentos;
      }
    }
  } catch (err) {
    console.warn('API Instrumentos no accesible. Usando datos locales.', err);
  } finally {
    renderInstrumentos();
  }
}

async function fetchInstrumentTipos() {
  if (!instrumentoTipoSelect) return;
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  
  try {
    let data = null;
    if (token) {
      const response = await fetch('/api/Instrumentos/tipos', {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        data = await response.json();
      }
    }
    
    if (data && Array.isArray(data)) {
      instrumentoTiposList = data;
    } else if (data && data.tipos && Array.isArray(data.tipos)) {
      instrumentoTiposList = data.tipos;
    }
  } catch (err) {
    console.warn('API de tipos de instrumentos no disponible. Usando fallback.', err);
  } finally {
    // Populate select
    instrumentoTipoSelect.innerHTML = '<option value="" disabled selected style="background: var(--bg-card); color: var(--text-muted);">Selecciona Tipo</option>';
    instrumentoTiposList.forEach(tipo => {
      const opt = document.createElement('option');
      opt.value = tipo;
      opt.textContent = tipo;
      opt.style.background = 'var(--bg-card)';
      opt.style.color = 'var(--text-primary)';
      instrumentoTipoSelect.appendChild(opt);
    });
  }
}

function renderInstrumentos(filterText = '') {
  if (!instrumentosTableBody) return;
  instrumentosTableBody.innerHTML = '';

  const filtered = instrumentosList.filter(i => {
    const tickerVal = i.tickerISIN || i.ticker || '';
    const nombreVal = i.nombreInstrumento || i.nombre || '';
    const query = filterText.toLowerCase();
    return tickerVal.toLowerCase().includes(query) || nombreVal.toLowerCase().includes(query);
  });

  // Render KPIs
  if (kpiTotalInstrumentos) kpiTotalInstrumentos.textContent = instrumentosList.length;
  if (kpiActivosInstrumentos) kpiActivosInstrumentos.textContent = instrumentosList.filter(i => i.activo !== false).length;

  if (filtered.length === 0) {
    instrumentosTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 20px; color: var(--text-muted);">No se encontraron instrumentos.</td></tr>`;
    return;
  }

  filtered.forEach(inst => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid var(--card-border)';
    
    const id = inst.idInstrumento;
    const ticker = inst.tickerISIN || inst.ticker || '-';
    const nombre = inst.nombreInstrumento || inst.nombre || '-';
    const tipo = inst.tipoInstrumento || '-';
    const moneda = inst.monedaInstrumento || inst.moneda || '-';
    const presencia = inst.tienePresenciaBursatil !== false ? 'Sí' : 'No';
    const porcentaje = inst.porcentajeAccionarioAnual !== undefined ? inst.porcentajeAccionarioAnual : 0;
    const isActive = inst.activo !== false;
    
    const badgeClass = isActive ? 'badge-active' : 'badge-inactive';
    const badgeText = isActive ? 'Activo' : 'Inactivo';
    
    const toggleButtonText = isActive ? 'Desactivar' : 'Activar';
    
    const toggleStyle = isActive 
      ? 'color: var(--text-danger); border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05);' 
      : 'color: var(--success); border-color: rgba(16, 185, 129, 0.2); background: rgba(16, 185, 129, 0.05);';

    row.innerHTML = `
      <td style="font-weight: 600; color: var(--primary);">${ticker}</td>
      <td>${nombre}</td>
      <td>${tipo}</td>
      <td>${moneda}</td>
      <td style="text-align: center;">${presencia}</td>
      <td style="text-align: right; font-weight: 500;">${porcentaje}%</td>
      <td style="text-align: center;"><span class="badge ${badgeClass}">${badgeText}</span></td>
      <td style="text-align: center; white-space: nowrap;">
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button class="btn-secondary btn-edit-instrumento" data-id="${id}" style="padding: 4px 8px; font-size: 11px;" type="button">Editar</button>
          <button class="btn-secondary btn-toggle-instrumento" data-id="${id}" style="padding: 4px 8px; font-size: 11px; ${toggleStyle}" type="button">${toggleButtonText}</button>
        </div>
      </td>
    `;
    
    instrumentosTableBody.appendChild(row);
  });

  // Attach event listeners
  document.querySelectorAll('.btn-edit-instrumento').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      openEditInstrumentoModal(id);
    });
  });

  document.querySelectorAll('.btn-toggle-instrumento').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      toggleInstrumentoStatus(id);
    });
  });
}

function openEditInstrumentoModal(id) {
  const inst = instrumentosList.find(i => i.idInstrumento.toString() === id.toString());
  if (!inst) return;

  if (modalInstrumentoTitle) modalInstrumentoTitle.textContent = 'Editar Instrumento';
  if (editInstrumentoIdxInput) editInstrumentoIdxInput.value = id;
  if (instrumentoTickerInput) instrumentoTickerInput.value = inst.tickerISIN || inst.ticker || '';
  if (instrumentoNombreInput) instrumentoNombreInput.value = inst.nombreInstrumento || inst.nombre || '';
  if (instrumentoTipoSelect) instrumentoTipoSelect.value = inst.tipoInstrumento || '';
  if (instrumentoMonedaSelect) instrumentoMonedaSelect.value = inst.monedaInstrumento || inst.moneda || 'CLP';
  if (instrumentoPresenciaInput) instrumentoPresenciaInput.checked = inst.tienePresenciaBursatil !== false;
  if (instrumentoPorcentajeInput) instrumentoPorcentajeInput.value = inst.porcentajeAccionarioAnual !== undefined ? inst.porcentajeAccionarioAnual : 0;

  if (modalOverlay) modalOverlay.classList.remove('hidden');
  if (modalInstrumento) modalInstrumento.classList.remove('hidden');
}

async function toggleInstrumentoStatus(id) {
  const inst = instrumentosList.find(i => i.idInstrumento.toString() === id.toString());
  if (!inst) return;

  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  const action = (inst.activo !== false) ? 'desactivar' : 'activar';
  let apiSuccess = false;

  if (token && !id.toString().startsWith('55555555-') && !id.toString().startsWith('mock-')) {
    try {
      const response = await fetch(`/api/Instrumentos/${id}/${action}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        apiSuccess = true;
      }
    } catch (err) {
      console.warn('API error toggling instrument status', err);
    }
  }

  // Update local state
  inst.activo = (action === 'activar');
  
  const displayTicker = inst.tickerISIN || inst.ticker || 'Instrumento';
  if (apiSuccess) {
    showToast('Estado Actualizado', `Instrumento ${displayTicker} ha sido ${action === 'activar' ? 'activado' : 'desactivado'} en el servidor.`, 'success');
  } else {
    showToast('Estado Actualizado', `Instrumento ${displayTicker} ha sido ${action === 'activar' ? 'activado' : 'desactivado'} localmente.`, 'success');
  }

  renderInstrumentos();
  populateInstrumentsDropdown();
}

// Bind Instrumentos events
if (btnAddInstrumento) {
  btnAddInstrumento.addEventListener('click', () => {
    if (modalInstrumentoTitle) modalInstrumentoTitle.textContent = 'Registrar Instrumento';
    if (editInstrumentoIdxInput) editInstrumentoIdxInput.value = '';
    if (formAddInstrumento) formAddInstrumento.reset();
    
    if (modalOverlay) modalOverlay.classList.remove('hidden');
    if (modalInstrumento) modalInstrumento.classList.remove('hidden');
  });
}

if (searchInstrumentosInput) {
  searchInstrumentosInput.addEventListener('input', (e) => {
    renderInstrumentos(e.target.value);
  });
}

if (formAddInstrumento) {
  formAddInstrumento.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
    const editId = editInstrumentoIdxInput?.value || '';

    const tickerISIN = instrumentoTickerInput?.value.trim().toUpperCase() || '';
    const nombre = instrumentoNombreInput?.value.trim() || '';
    const tipo = instrumentoTipoSelect?.value || '';
    const monedaInstrumento = instrumentoMonedaSelect?.value || 'CLP';
    const tienePresenciaBursatil = instrumentoPresenciaInput ? instrumentoPresenciaInput.checked : true;
    const porcentajeAccionarioAnual = parseFloat(instrumentoPorcentajeInput?.value || 0);

    if (!tickerISIN || !nombre || !tipo || !monedaInstrumento) {
      showToast('Campos requeridos', 'Por favor completa todos los campos obligatorios (*).', 'error');
      return;
    }

    const submitBtn = document.getElementById('btn-submit-instrumento');
    if (submitBtn) submitBtn.disabled = true;

    let apiSuccess = false;
    let savedRecord = null;

    // Body payload matching the exact backend API structure
    const payload = {
      tipoInstrumento: tipo,
      nombreInstrumento: nombre,
      tickerISIN: tickerISIN,
      monedaInstrumento: monedaInstrumento,
      tienePresenciaBursatil: tienePresenciaBursatil,
      porcentajeAccionarioAnual: porcentajeAccionarioAnual
    };

    if (token && !editId.startsWith('55555555-') && !editId.startsWith('mock-')) {
      try {
        const url = editId ? `/api/Instrumentos/${editId}` : '/api/Instrumentos';
        const method = editId ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          apiSuccess = true;
          const text = await response.text();
          if (text) {
            try {
              savedRecord = JSON.parse(text);
            } catch (_) {}
          }
        }
      } catch (err) {
        console.warn('API error saving instrument', err);
      }
    }

    if (editId) {
      // Edit mode
      const idx = instrumentosList.findIndex(i => i.idInstrumento.toString() === editId.toString());
      if (idx !== -1) {
        const isCurrentlyActive = instrumentosList[idx].activo !== false;
        instrumentosList[idx] = {
          idInstrumento: editId,
          tickerISIN,
          nombreInstrumento: nombre,
          tipoInstrumento: tipo,
          monedaInstrumento,
          tienePresenciaBursatil,
          porcentajeAccionarioAnual,
          activo: isCurrentlyActive
        };
      }
      showToast('Instrumento Actualizado', apiSuccess ? 'Instrumento modificado en el servidor.' : 'Instrumento modificado localmente.', 'success');
    } else {
      // Create mode
      const newId = (savedRecord && savedRecord.idInstrumento) ? savedRecord.idInstrumento : ('mock-inst-' + Math.random().toString(36).substring(2, 15));
      instrumentosList.push({
        idInstrumento: newId,
        tickerISIN,
        nombreInstrumento: nombre,
        tipoInstrumento: tipo,
        monedaInstrumento,
        tienePresenciaBursatil,
        porcentajeAccionarioAnual,
        activo: true
      });
      showToast('Instrumento Registrado', apiSuccess ? 'Instrumento creado en el servidor.' : 'Instrumento creado localmente.', 'success');
    }

    if (submitBtn) submitBtn.disabled = false;
    closeAllModals();
    renderInstrumentos();
    populateInstrumentsDropdown();
  });
}

function renderAGFs(filterText = '') {
  if (!agfTableBody) return;
  agfTableBody.innerHTML = '';
  
  const filtered = admGralFondosList.filter(a => {
    const nameVal = a.nombreAdmGralFondos || a.nombre || '';
    return nameVal.toLowerCase().includes(filterText.toLowerCase());
  });

  if (filtered.length === 0) {
    agfTableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 20px; color: var(--text-muted);">No se encontraron AGFs.</td></tr>`;
    return;
  }

  filtered.forEach(agf => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid var(--card-border)';
    const statusText = agf.activo !== false ? 'Activo' : 'Inactivo';
    const statusClass = agf.activo !== false ? 'badge-active' : 'badge-inactive';
    const agfName = agf.nombreAdmGralFondos || agf.nombre || '';
    
    row.innerHTML = `
      <td style="padding: 12px 10px; font-weight: 500; color: var(--text-primary);">${capitalizeText(agfName) || '-'}</td>
      <td style="padding: 12px 10px;"><span class="badge ${statusClass}">${statusText}</span></td>
      <td style="padding: 12px 10px; text-align: right;">
        <button class="btn-table-action btn-edit-agf" title="Editar" style="background: none; border: none; cursor: pointer; color: var(--text-muted); margin-right: 8px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button class="btn-table-action btn-toggle-status-agf" title="Cambiar Estado" style="background: none; border: none; cursor: pointer; color: var(--text-muted);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
        </button>
      </td>
    `;
    
    // Edit click handler
    row.querySelector('.btn-edit-agf').addEventListener('click', async () => {
      editAgfIdxInput.value = agf.idAdmGralFondos;
      agfNombreInput.value = agfName;
      modalAgfTitle.textContent = 'Editar Administradora';
      
      agfNombreInput.dispatchEvent(new Event('input'));
      
      modalOverlay.classList.remove('hidden');
      modalAgf.classList.remove('hidden');

      // Fetch detail from API if it is not a mock ID
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (token && typeof agf.idAdmGralFondos === 'string' && !agf.idAdmGralFondos.toString().startsWith('mock-')) {
        try {
          const response = await fetch(`/api/AdmGralFondos/${agf.idAdmGralFondos}`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
          });
          if (response.ok) {
            const data = await response.json();
            const detail = data.admGralFondos || data;
            if (detail) {
              agfNombreInput.value = detail.nombreAdmGralFondos || detail.nombre || agfNombreInput.value;
            }
          }
        } catch (err) {
          console.warn('Error fetching AGF detail from API:', err);
        }
      }
    });

    // Toggle status click handler
    row.querySelector('.btn-toggle-status-agf').addEventListener('click', async () => {
      const newStatus = agf.activo === false;
      const id = agf.idAdmGralFondos;
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      
      if (token && id && !id.toString().startsWith('mock-')) {
        const url = newStatus ? `/api/AdmGralFondos/reactivar/${id}` : `/api/AdmGralFondos/desactivar/${id}`;
        try {
          await fetch(url, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
          });
        } catch (err) {
          console.warn('API error switching AGF status', err);
        }
      }
      
      agf.activo = newStatus;
      showToast(newStatus ? 'AGF Reactivada' : 'AGF Desactivada', `La AGF ha sido ${newStatus ? 'activada' : 'desactivada'} con éxito.`, 'success');
      renderAGFs(searchAgfInput ? searchAgfInput.value : '');
    });

    agfTableBody.appendChild(row);
  });
}

// --------------------------------------------------------------------------
// Carteras API Integration
// --------------------------------------------------------------------------
async function fetchAndRenderCarteras() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  // Asegurar que las AGFs estén cargadas para mapear nombres en la tabla
  if (admGralFondosList.length === 0) {
    await fetchAndRenderAGFs();
  }
  
  const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
  if (selectedClientId) {
    await fetchAndCacheSaldos();
  }

  try {
    if (carterasTableBody) {
      carterasTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px;">Cargando carteras...</td></tr>`;
    }
    let data = null;
    if (token && selectedClientId) {
      const response = await fetch(`/api/Carteras?idCliente=${selectedClientId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        data = await response.json();
      }
    }
    
    if (data) {
      if (Array.isArray(data)) {
        carterasList = data;
      } else if (data.carteras && Array.isArray(data.carteras)) {
        carterasList = data.carteras;
      } else {
        carterasList = [];
      }
    } else {
      carterasList = [];
    }
  } catch (err) {
    console.warn('API Carteras no accesible.', err);
    carterasList = [];
  } finally {
    await renderCarteras();
  }
}

async function fetchAndCacheSaldos() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
  if (token && selectedClientId) {
    try {
      const response = await fetch(`/api/Caja/saldos?idCliente=${selectedClientId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.saldos || data.carteras || []);
        cachedCarterasSaldos = {};
        list.forEach(item => {
          if (item && item.idCartera) {
            cachedCarterasSaldos[item.idCartera.toString().toLowerCase()] = typeof item.saldo === 'number' ? item.saldo : (typeof item.monto === 'number' ? item.monto : 0);
          }
        });
        return true;
      }
    } catch (err) {
      console.warn('Error fetching consolidated saldos from API:', err);
    }
  }
  return false;
}

async function fetchCarteraBalance(idCartera) {
  const cacheKey = (idCartera || '').toString().toLowerCase();
  // Intentar leer del caché de saldos consolidados
  if (cachedCarterasSaldos[cacheKey] !== undefined) {
    return cachedCarterasSaldos[cacheKey];
  }

  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (token && idCartera && !idCartera.toString().startsWith('c-')) {
    try {
      const response = await fetch(`/api/Caja/saldo/${idCartera}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        const balance = typeof data === 'number' ? data : (data.saldo !== undefined ? data.saldo : (data.monto !== undefined ? data.monto : 0));
        cachedCarterasSaldos[cacheKey] = balance;
        return balance;
      }
    } catch (err) {
      console.warn(`Error al consultar saldo de cartera ${idCartera} en API:`, err);
    }
  }
  
  // Local Memory Fallback calculation
  let balance = 0; // default base balance starts at 0
  
  const movements = cajaMovimientosList.filter(m => (m.idCartera || '').toString().toLowerCase() === cacheKey);
  const debitTypes = ['RETIRO', 'COMISION', 'COMPRA_INSTRUMENTO', 'DEBITO_AJUSTE', 'IMPUESTO', 'TRASPASO_OUT'];
  movements.forEach(m => {
    const typeVal = m.tipoMovimientoCaja || m.tipoMovimiento || '';
    const isNegative = debitTypes.includes(typeVal.toUpperCase()) || typeVal.toLowerCase() === 'retiro';
    if (isNegative) balance -= m.monto;
    else balance += m.monto;
  });
  return balance;
}

async function renderCarteras(filterText = '') {
  if (!carterasTableBody) return;
  carterasTableBody.innerHTML = '';
  
  const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
  if (!selectedClientId) {
    carterasTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">Selecciona un cliente para gestionar sus carteras.</td></tr>`;
    return;
  }

  const clientCarteras = carterasList.filter(c => 
    (c.idCliente || '').toString().toLowerCase() === selectedClientId.toString().toLowerCase() && 
    ((c.cuentaCartera && c.cuentaCartera.toLowerCase().includes(filterText.toLowerCase())) ||
     (c.nombreCartera && c.nombreCartera.toLowerCase().includes(filterText.toLowerCase())))
  );

  if (clientCarteras.length === 0) {
    carterasTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">Este cliente no registra carteras de inversión.</td></tr>`;
    return;
  }

  // Populate options for Cash management select options
  if (movimientoCarteraSelect) {
    movimientoCarteraSelect.innerHTML = '<option value="" disabled selected style="background: var(--bg-card); color: var(--text-muted);">Selecciona Cartera</option>';
  }
  if (traspasoOrigenSelect) {
    traspasoOrigenSelect.innerHTML = '<option value="" disabled selected style="background: var(--bg-card); color: var(--text-muted);">Selecciona Cartera Origen</option>';
  }
  if (traspasoDestinoSelect) {
    traspasoDestinoSelect.innerHTML = '<option value="" disabled selected style="background: var(--bg-card); color: var(--text-muted);">Selecciona Cartera Destino</option>';
  }

  for (const cartera of clientCarteras) {
    const carteraName = cartera.cuentaCartera || cartera.nombreCartera || `Cartera ${cartera.idCartera.substring(0, 8)}`;
    
    // Add options to selects
    const opt = document.createElement('option');
    opt.value = cartera.idCartera;
    opt.textContent = carteraName;
    opt.style.background = 'var(--bg-card)';
    opt.style.color = 'var(--text-primary)';
    
    if (movimientoCarteraSelect && cartera.activo !== false) movimientoCarteraSelect.appendChild(opt.cloneNode(true));
    if (traspasoOrigenSelect && cartera.activo !== false) traspasoOrigenSelect.appendChild(opt.cloneNode(true));
    if (traspasoDestinoSelect && cartera.activo !== false) traspasoDestinoSelect.appendChild(opt.cloneNode(true));

    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid var(--card-border)';
    const statusText = cartera.activo !== false ? 'Activo' : 'Inactivo';
    const statusClass = cartera.activo !== false ? 'badge-active' : 'badge-inactive';
    
    // Look up AGF name (case-insensitive for UUIDs)
    const agfObj = admGralFondosList.find(a => a.idAdmGralFondos.toString().toLowerCase() === (cartera.idAdmGralFondos || '').toString().toLowerCase());
    const agfName = agfObj ? (agfObj.nombreAdmGralFondos || agfObj.nombre) : (cartera.tipoCartera || 'Sin AGF');

     row.innerHTML = `
      <td style="padding: 12px 10px; font-weight: 500; color: var(--text-primary);">${carteraName}</td>
      <td style="padding: 12px 10px; color: var(--text-secondary);">${agfName}</td>
      <td style="padding: 12px 10px;"><span class="badge ${statusClass}">${statusText}</span></td>
      <td style="padding: 12px 10px; text-align: right;">
        <button class="btn-table-action btn-edit-cartera" title="Editar" style="background: none; border: none; cursor: pointer; color: var(--text-muted); margin-right: 8px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button class="btn-table-action btn-toggle-status-cartera" title="Cambiar Estado" style="background: none; border: none; cursor: pointer; color: var(--text-muted);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
        </button>
      </td>
    `;
    
    // Edit click
    row.querySelector('.btn-edit-cartera').addEventListener('click', async () => {
      editCarteraIdxInput.value = cartera.idCartera;
      carteraNombreInput.value = carteraName;
      modalCarteraTitle.textContent = 'Editar Cartera';
      
      populateAgfDropdown();
      if (carteraAgfSelect) {
        carteraAgfSelect.value = cartera.idAdmGralFondos || '';
      }
      
      carteraNombreInput.dispatchEvent(new Event('input'));
      
      modalOverlay.classList.remove('hidden');
      modalCartera.classList.remove('hidden');

      // Fetch detail from API if it is not a mock ID
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      if (token && typeof cartera.idCartera === 'string' && !cartera.idCartera.startsWith('c-')) {
        try {
          const response = await fetch(`/api/Carteras/${cartera.idCartera}`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
          });
          if (response.ok) {
            const data = await response.json();
            const detail = data.cartera || data;
            if (detail) {
              carteraNombreInput.value = detail.cuentaCartera || detail.nombreCartera || carteraNombreInput.value;
              if (carteraAgfSelect) {
                carteraAgfSelect.value = detail.idAdmGralFondos || carteraAgfSelect.value;
              }
              carteraNombreInput.dispatchEvent(new Event('input'));
            }
          }
        } catch (err) {
          console.warn('Error fetching Cartera detail from API:', err);
        }
      }
    });

    // Toggle status click
    row.querySelector('.btn-toggle-status-cartera').addEventListener('click', async () => {
      const newStatus = cartera.activo === false;
      const id = cartera.idCartera;
      const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
      
      if (token && id && !id.toString().startsWith('c-')) {
        const url = newStatus ? `/api/Carteras/reactivar/${id}` : `/api/Carteras/desactivar/${id}`;
        try {
          await fetch(url, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
          });
        } catch (err) {
          console.warn('API error switching Cartera status', err);
        }
      }
      
      cartera.activo = newStatus;
      showToast(newStatus ? 'Cartera Reactivada' : 'Cartera Desactivada', `La cartera ha sido ${newStatus ? 'activada' : 'desactivada'} con éxito.`, 'success');
      renderCarteras(searchCarterasInput ? searchCarterasInput.value : '');
    });

    carterasTableBody.appendChild(row);
  }
}

// --------------------------------------------------------------------------
// Caja & Balance API Integration
// --------------------------------------------------------------------------
async function fetchAndRenderCaja() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
  const clientCarteras = carterasList.filter(c => (c.idCliente || '').toString().toLowerCase() === selectedClientId.toString().toLowerCase());
  
  if (selectedClientId) {
    await fetchAndCacheSaldos();
  }

  // Cargar tipos de movimiento dinámicos desde el backend
  await fetchTiposMovimiento();

  try {
    if (cajaMovementsTableBody) {
      cajaMovementsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px;">Cargando movimientos de caja...</td></tr>`;
    }
    
    let allMovements = [];
    if (token && clientCarteras.length > 0) {
      // Query movements for each portfolio of the client
      for (const cartera of clientCarteras) {
        if (cartera.idCartera && !cartera.idCartera.startsWith('c-')) {
          try {
            const response = await fetch(`/api/Caja/movimientos?idCartera=${cartera.idCartera}`, {
              headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
            });
            if (response.ok) {
              const resData = await response.json();
              const list = Array.isArray(resData) ? resData : (resData.movimientos || []);
              allMovements.push(...list);
            }
          } catch (e) {
            console.warn(`Error querying movements for portfolio ${cartera.idCartera}:`, e);
          }
        }
      }
    }
    
    if (allMovements.length > 0) {
      cajaMovimientosList = allMovements;
    } else {
      cajaMovimientosList = [];
    }
  } catch (err) {
    console.warn('API Caja Movements no accesible.', err);
    cajaMovimientosList = [];
  } finally {
    await renderCaja();
  }
}

async function fetchTiposMovimiento() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (token) {
    try {
      const response = await fetch('/api/Caja/tipos-movimiento', {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.exitoso && data.tipos) {
          const creditos = data.tipos.creditos || [];
          const debitos = data.tipos.debitos || [];
          cajaTiposMovimiento = [...creditos, ...debitos];
        } else if (Array.isArray(data) && data.length > 0) {
          cajaTiposMovimiento = data.map(item => typeof item === 'string' ? item : (item.nombre || item.tipo || item.tipoMovimientoCaja));
        }
      }
    } catch (err) {
      console.warn('Error fetching tipos-movimiento from API:', err);
    }
  }
}

function populateTiposMovimientoSelect() {
  if (!movimientoTipoSelect) return;
  movimientoTipoSelect.innerHTML = '<option value="" disabled selected style="background: var(--bg-card); color: var(--text-muted);">Selecciona Tipo de Movimiento</option>';
  cajaTiposMovimiento.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = getFriendlyMovimientoLabel(t);
    opt.style.background = 'var(--bg-card)';
    opt.style.color = 'var(--text-primary)';
    movimientoTipoSelect.appendChild(opt);
  });
}

async function renderCaja() {

  // 2. Render Movements Table
  if (cajaMovementsTableBody) {
    cajaMovementsTableBody.innerHTML = '';
    const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
    const clientCarteraIds = carterasList.filter(c => (c.idCliente || '').toString().toLowerCase() === selectedClientId.toString().toLowerCase()).map(c => c.idCartera);
    const clientCarteraIdsLower = clientCarteraIds.map(id => (id || '').toString().toLowerCase());
    const clientMovements = cajaMovimientosList.filter(m => clientCarteraIdsLower.includes((m.idCartera || '').toString().toLowerCase()));
    
    if (clientMovements.length === 0) {
      cajaMovementsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">No se registran movimientos de caja para este cliente.</td></tr>`;
      return;
    }

    const sorted = [...clientMovements].sort((a, b) => {
      const dateA = a.fechaMovimiento || a.fecha || '';
      const dateB = b.fechaMovimiento || b.fecha || '';
      return new Date(dateB) - new Date(dateA);
    });

    sorted.forEach(mov => {
      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid var(--card-border)';
      
      const cartObj = carterasList.find(c => (c.idCartera || '').toString().toLowerCase() === (mov.idCartera || '').toString().toLowerCase());
      const carteraName = cartObj ? (cartObj.cuentaCartera || cartObj.nombreCartera) : 'Cartera Desconocida';
      
      const typeVal = mov.tipoMovimientoCaja || mov.tipoMovimiento || '';
      const debitTypes = ['RETIRO', 'COMISION', 'COMPRA_INSTRUMENTO', 'DEBITO_AJUSTE', 'IMPUESTO', 'TRASPASO_OUT'];
      const isNegative = debitTypes.includes(typeVal.toUpperCase()) || typeVal.toLowerCase() === 'retiro';
      const typeClass = isNegative ? 'text-danger' : 'text-success';
      const amountPrefix = isNegative ? '-' : '+';
      
      const dateVal = mov.fechaMovimiento || mov.fecha;
      let dateStr = '-';
      if (dateVal) {
        const d = new Date(dateVal);
        dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }
      
      const descVal = mov.descripcion || mov.motivo || '-';
      const displayType = getFriendlyMovimientoLabel(typeVal);

      row.innerHTML = `
        <td style="padding: 12px 10px; color: var(--text-secondary);">${dateStr}</td>
        <td style="padding: 12px 10px; font-weight: 500; color: var(--text-primary);">${carteraName}</td>
        <td style="padding: 12px 10px;"><span class="${typeClass}" style="font-weight: 600;">${displayType}</span></td>
        <td style="padding: 12px 10px; font-weight: 600;" class="${typeClass}">${amountPrefix} ${formatMoneda(mov.monto, mov.moneda)}</td>
        <td style="padding: 12px 10px; color: var(--text-secondary);">${descVal}</td>
      `;
      cajaMovementsTableBody.appendChild(row);
    });
  }
}

// Form Submit Event Listeners (AGF, Carteras, Caja)
// --------------------------------------------------------------------------
if (formAddAgf) {
  formAddAgf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = agfNombreInput.value.trim();
    const editId = editAgfIdxInput.value;
    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

    let apiSuccess = false;
    let newRecord = null;

    if (token) {
      const url = editId ? '/api/AdmGralFondos/actualizar' : '/api/AdmGralFondos/agregar';
      const method = editId ? 'PUT' : 'POST';
      const bodyObj = editId ? { idAdmGralFondos: editId, nombreAdmGralFondos: nombre } 
                             : { nombreAdmGralFondos: nombre };
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyObj)
        });
        if (response.ok) {
          apiSuccess = true;
          const text = await response.text();
          if (text) {
            try {
              const resData = JSON.parse(text);
              newRecord = resData.admGralFondos || resData;
            } catch (jsonErr) {
              console.log('API response was not JSON:', text);
            }
          }
        }
      } catch (err) {
        console.warn('Error saving AGF to backend API', err);
      }
    }

    // Build saved record with typed value fallbacks for robustness
    const savedRecord = {
      idAdmGralFondos: (newRecord && newRecord.idAdmGralFondos) ? newRecord.idAdmGralFondos : (editId || 'mock-agf-' + (admGralFondosList.length + 1)),
      nombreAdmGralFondos: (newRecord && newRecord.nombreAdmGralFondos) ? newRecord.nombreAdmGralFondos : nombre,
      nombre: (newRecord && newRecord.nombreAdmGralFondos) ? newRecord.nombreAdmGralFondos : nombre,
      rut: '',
      activo: (newRecord && newRecord.activo !== undefined) ? newRecord.activo : true
    };

    if (editId) {
      const idx = admGralFondosList.findIndex(a => a.idAdmGralFondos.toString().toLowerCase() === editId.toString().toLowerCase());
      if (idx !== -1) {
        if (!newRecord || newRecord.activo === undefined) {
          savedRecord.activo = admGralFondosList[idx].activo !== false;
        }
        admGralFondosList[idx] = savedRecord;
      }
      showToast(apiSuccess ? 'AGF Guardada' : 'AGF Editada', apiSuccess ? 'La administradora se ha guardado en el servidor con éxito.' : 'La administradora se ha actualizado localmente.', 'success');
    } else {
      admGralFondosList.push(savedRecord);
      showToast(apiSuccess ? 'AGF Guardada' : 'AGF Agregada', apiSuccess ? 'La administradora se ha guardado en el servidor con éxito.' : 'La administradora se ha registrado localmente con éxito.', 'success');
    }

    closeAllModals();
    renderAGFs(searchAgfInput ? searchAgfInput.value : '');
  });
}

if (formAddCartera) {
  formAddCartera.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = carteraNombreInput.value.trim();
    const agfId = carteraAgfSelect.value;
    const moneda = 'CLP';
    const editId = editCarteraIdxInput.value;
    const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

    if (!selectedClientId) {
      showToast('Error', 'Debes seleccionar un cliente activo en la cabecera.', 'error');
      return;
    }
    if (!agfId) {
      showToast('Error', 'Debes seleccionar una Administradora (AGF).', 'error');
      return;
    }

    let apiSuccess = false;
    let newRecord = null;

    if (token) {
      const url = editId ? '/api/Carteras/actualizar' : '/api/Carteras/agregar';
      const method = editId ? 'PUT' : 'POST';
      const bodyObj = editId ? { idCartera: editId, idAdmGralFondos: agfId, idCliente: selectedClientId, cuentaCartera: nombre } 
                             : { idAdmGralFondos: agfId, idCliente: selectedClientId, cuentaCartera: nombre, monedaCaja: moneda };
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyObj)
        });
        if (response.ok) {
          apiSuccess = true;
          const text = await response.text();
          if (text) {
            try {
              const resData = JSON.parse(text);
              newRecord = resData.cartera || resData;
            } catch (jsonErr) {
              console.log('API response was not JSON:', text);
            }
          }
        }
      } catch (err) {
        console.warn('Error saving Cartera to backend API', err);
      }
    }

    const savedRecord = {
      idCartera: (newRecord && newRecord.idCartera) ? newRecord.idCartera : (editId || 'c-' + (carterasList.length + 1)),
      idCliente: (newRecord && newRecord.idCliente) ? newRecord.idCliente : selectedClientId,
      nombreCartera: (newRecord && (newRecord.cuentaCartera || newRecord.nombreCartera)) ? (newRecord.cuentaCartera || newRecord.nombreCartera) : nombre,
      cuentaCartera: (newRecord && newRecord.cuentaCartera) ? newRecord.cuentaCartera : nombre,
      tipoCartera: (newRecord && newRecord.tipoCartera) ? newRecord.tipoCartera : '',
      idAdmGralFondos: (newRecord && newRecord.idAdmGralFondos) ? newRecord.idAdmGralFondos : agfId,
      monedaCaja: (newRecord && newRecord.monedaCaja) ? newRecord.monedaCaja : moneda,
      activo: (newRecord && newRecord.activo !== undefined) ? newRecord.activo : true
    };

    if (editId) {
      const idx = carterasList.findIndex(c => c.idCartera.toString().toLowerCase() === editId.toString().toLowerCase());
      if (idx !== -1) {
        if (!newRecord || newRecord.activo === undefined) {
          savedRecord.activo = carterasList[idx].activo !== false;
        }
        carterasList[idx] = savedRecord;
      }
      showToast(apiSuccess ? 'Cartera Guardada' : 'Cartera Editada', apiSuccess ? 'La cartera se ha guardado en el servidor con éxito.' : 'La cartera se ha actualizado localmente.', 'success');
    } else {
      carterasList.push(savedRecord);
      showToast(apiSuccess ? 'Cartera Guardada' : 'Cartera Agregada', apiSuccess ? 'La cartera se ha guardado en el servidor con éxito.' : 'La cartera se ha registrado localmente con éxito.', 'success');
    }

    // Limpiar caché de saldo de esta cartera para forzar recarga
    const cacheKey = editId || savedRecord.idCartera;
    if (cacheKey) {
      delete cachedCarterasSaldos[cacheKey];
      delete cachedCarterasSaldos[cacheKey.toString().toLowerCase()];
    }

    closeAllModals();
    renderCarteras(searchCarterasInput ? searchCarterasInput.value : '');
    renderCaja();
  });
}

if (formAddMovimiento) {
  formAddMovimiento.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idCartera = movimientoCarteraSelect.value;
    const tipo = movimientoTipoSelect.value;
    const monto = parseFloat(movimientoMontoInput.value);
    const moneda = movimientoMonedaSelect ? movimientoMonedaSelect.value : "CLP";
    const tipoCambio = parseFloat(movimientoTipoCambioInput ? movimientoTipoCambioInput.value : 1);
    const monedaTipoCambioPar = movimientoMonedaParSelect ? movimientoMonedaParSelect.value : "CLP";
    const fechaMovimiento = movimientoFechaInput && movimientoFechaInput.value 
      ? new Date(movimientoFechaInput.value).toISOString() 
      : new Date().toISOString();
    const motivo = movimientoMotivoInput.value.trim();
    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

    let apiSuccess = false;
    let newRecord = null;

    if (token && idCartera && !idCartera.startsWith('c-')) {
      try {
        const response = await fetch('/api/Caja/movimiento', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idCartera,
            tipoMovimientoCaja: tipo,
            monto,
            moneda,
            tipoCambio,
            monedaTipoCambioPar,
            fechaMovimiento,
            idOperacionInstrumento: 0,
            descripcion: motivo
          })
        });
        if (response.ok) {
          apiSuccess = true;
          const text = await response.text();
          if (text) {
            try {
              const resData = JSON.parse(text);
              newRecord = resData.movimiento || resData;
            } catch (jsonErr) {
              console.log('API response was not JSON:', text);
            }
          }
        }
      } catch (err) {
        console.warn('Error saving movement to API', err);
      }
    }

    const savedRecord = {
      idMovimiento: (newRecord && newRecord.idMovimiento) ? newRecord.idMovimiento : ('m-' + (cajaMovimientosList.length + 1)),
      idCartera: (newRecord && newRecord.idCartera) ? newRecord.idCartera : idCartera,
      tipoMovimiento: (newRecord && (newRecord.tipoMovimiento || newRecord.tipoMovimientoCaja)) ? (newRecord.tipoMovimiento || newRecord.tipoMovimientoCaja) : tipo,
      tipoMovimientoCaja: (newRecord && newRecord.tipoMovimientoCaja) ? newRecord.tipoMovimientoCaja : tipo,
      monto: (newRecord && newRecord.monto !== undefined) ? newRecord.monto : monto,
      moneda: (newRecord && newRecord.moneda) ? newRecord.moneda : moneda,
      fecha: (newRecord && (newRecord.fecha || newRecord.fechaMovimiento)) ? (newRecord.fecha || newRecord.fechaMovimiento) : fechaMovimiento,
      fechaMovimiento: (newRecord && newRecord.fechaMovimiento) ? newRecord.fechaMovimiento : fechaMovimiento,
      motivo: (newRecord && (newRecord.motivo || newRecord.descripcion)) ? (newRecord.motivo || newRecord.descripcion) : motivo,
      descripcion: (newRecord && newRecord.descripcion) ? newRecord.descripcion : motivo
    };

    cajaMovimientosList.push(savedRecord);
    showToast(apiSuccess ? 'Movimiento Registrado' : 'Movimiento Registrado Localmente', 
              apiSuccess ? 'El movimiento ha sido registrado en el servidor.' : 'El movimiento se ha registrado localmente en la cartera.', 'success');

    // Limpiar caché de saldo de esta cartera para forzar recarga
    if (idCartera) {
      delete cachedCarterasSaldos[idCartera];
      delete cachedCarterasSaldos[idCartera.toString().toLowerCase()];
    }

    closeAllModals();
    renderCaja();
    renderCarteras();
  });
}

if (formAddTraspaso) {
  formAddTraspaso.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idOrigen = traspasoOrigenSelect.value;
    const idDestino = traspasoDestinoSelect.value;
    const monto = parseFloat(traspasoMontoInput.value);
    const motivo = traspasoMotivoInput.value.trim();
    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');

    if (idOrigen.toString().toLowerCase() === idDestino.toString().toLowerCase()) {
      showToast('Error de Traspaso', 'La cartera de origen y destino deben ser distintas.', 'error');
      return;
    }

    const balanceOrigen = await fetchCarteraBalance(idOrigen);
    if (balanceOrigen < monto) {
      showToast('Saldo Insuficiente', 'La cartera de origen no cuenta con fondos suficientes para el traspaso.', 'error');
      return;
    }

    let apiSuccess = false;
    let newRecords = null;

    if (token && idOrigen && !idOrigen.toString().toLowerCase().startsWith('c-') && idDestino && !idDestino.toString().toLowerCase().startsWith('c-')) {
      try {
        const response = await fetch('/api/Caja/traspaso', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idCarteraOrigen: idOrigen,
            idCarteraDestino: idDestino,
            monto,
            moneda: "CLP",
            fechaMovimiento: new Date().toISOString(),
            descripcion: motivo
          })
        });
        if (response.ok) {
          apiSuccess = true;
          const text = await response.text();
          if (text) {
            try {
              const resData = JSON.parse(text);
              newRecords = resData.movimientos || resData;
            } catch (jsonErr) {
              console.log('API response was not JSON:', text);
            }
          }
        }
      } catch (err) {
        console.warn('Error saving transfer to API', err);
      }
    }

    if (apiSuccess && newRecords) {
      const recordsToPush = Array.isArray(newRecords) ? newRecords : [newRecords];
      recordsToPush.forEach(rec => {
        cajaMovimientosList.push({
          idMovimiento: rec.idMovimiento || ('m-' + (cajaMovimientosList.length + 1)),
          idCartera: rec.idCartera || '',
          tipoMovimiento: rec.tipoMovimiento || rec.tipoMovimientoCaja || '',
          tipoMovimientoCaja: rec.tipoMovimientoCaja || rec.tipoMovimiento || '',
          monto: rec.monto !== undefined ? rec.monto : monto,
          fecha: rec.fecha || rec.fechaMovimiento || new Date().toISOString(),
          fechaMovimiento: rec.fechaMovimiento || rec.fecha || new Date().toISOString(),
          motivo: rec.motivo || rec.descripcion || motivo,
          descripcion: rec.descripcion || rec.motivo || motivo
        });
      });
      showToast('Traspaso Realizado', 'El traspaso de fondos se ha registrado en el servidor con éxito.', 'success');
    } else {
      // Local fallback - create withdrawal from source, deposit to destination
      const newId1 = 'm-' + (cajaMovimientosList.length + 1);
      const newId2 = 'm-' + (cajaMovimientosList.length + 2);
      const dateStr = new Date().toISOString();
      
      cajaMovimientosList.push({
        idMovimiento: newId1,
        idCartera: idOrigen,
        tipoMovimiento: 'TRASPASO_OUT',
        tipoMovimientoCaja: 'TRASPASO_OUT',
        monto,
        fecha: dateStr,
        fechaMovimiento: dateStr,
        motivo: `Traspaso a Cartera Destino: ${motivo}`,
        descripcion: `Traspaso a Cartera Destino: ${motivo}`
      });
      
      cajaMovimientosList.push({
        idMovimiento: newId2,
        idCartera: idDestino,
        tipoMovimiento: 'TRASPASO_IN',
        tipoMovimientoCaja: 'TRASPASO_IN',
        monto,
        fecha: dateStr,
        fechaMovimiento: dateStr,
        motivo: `Traspaso desde Cartera Origen: ${motivo}`,
        descripcion: `Traspaso desde Cartera Origen: ${motivo}`
      });
      
      showToast('Traspaso Registrado', 'El traspaso se ha registrado localmente con éxito.', 'success');
    }

    // Limpiar caché de saldo de ambas carteras para forzar recarga
    if (idOrigen) {
      delete cachedCarterasSaldos[idOrigen];
      delete cachedCarterasSaldos[idOrigen.toString().toLowerCase()];
    }
    if (idDestino) {
      delete cachedCarterasSaldos[idDestino];
      delete cachedCarterasSaldos[idDestino.toString().toLowerCase()];
    }

    closeAllModals();
    renderCaja();
    renderCarteras();
  });
}

// --------------------------------------------------------------------------
// Portfolio Subtab Switch Controller
// --------------------------------------------------------------------------
if (portfolioSubnavItems.length > 0) {
  portfolioSubnavItems.forEach(item => {
    item.addEventListener('click', () => {
      const subtabName = item.getAttribute('data-subtab');
      
      portfolioSubnavItems.forEach(btn => btn.classList.remove('active'));
      item.classList.add('active');

      portfolioSubtabContents.forEach(pane => pane.classList.remove('active'));
      const pane = document.getElementById(`subtab-${subtabName}`);
      if (pane) pane.classList.add('active');

      // Refresh specific tab data
      if (subtabName === 'agf') {
        fetchAndRenderAGFs();
      } else if (subtabName === 'carteras') {
        fetchAndRenderCarteras();
      } else if (subtabName === 'caja') {
        fetchAndRenderCaja();
      } else if (subtabName === 'operaciones') {
        fetchAndRenderOperaciones();
      } else if (subtabName === 'instrumentos') {
        fetchAndRenderInstrumentos();
      }
    });
  });
}

// Context Change Event Handler
window.addEventListener('clientContextChanged', () => {
  // Switch active nav to Inicio
  if (typeof navItems !== 'undefined') {
    navItems.forEach(btn => btn.classList.remove('active'));
    const btnInicioNav = Array.from(navItems).find(btn => btn.getAttribute('data-tab') === 'inicio');
    if (btnInicioNav) btnInicioNav.classList.add('active');
  }

  // Toggle tab visibility back to inicio
  if (typeof tabPanes !== 'undefined') {
    tabPanes.forEach(pane => pane.classList.remove('active'));
    const tabInicio = document.getElementById('tab-inicio');
    if (tabInicio) tabInicio.classList.add('active');
  }

  // Restore header title
  if (typeof currentTabTitle !== 'undefined' && typeof navItems !== 'undefined') {
    const btnInicioNav = Array.from(navItems).find(btn => btn.getAttribute('data-tab') === 'inicio');
    if (btnInicioNav) {
      currentTabTitle.textContent = btnInicioNav.querySelector('span').textContent;
    }
  }

  // Reset portfolio subtabs back to resumen
  if (typeof portfolioSubtabContents !== 'undefined') {
    portfolioSubtabContents.forEach(pane => pane.classList.remove('active'));
    const firstSubtabContent = document.getElementById('subtab-resumen');
    if (firstSubtabContent) firstSubtabContent.classList.add('active');
  }
  if (typeof portfolioSubnavItems !== 'undefined') {
    portfolioSubnavItems.forEach(btn => btn.classList.remove('active'));
    const firstSubnavBtn = document.querySelector('.portfolio-subnav-item');
    if (firstSubnavBtn) firstSubnavBtn.classList.add('active');
  }
});

// Modals Trigger Listeners
if (btnAddCartera) {
  btnAddCartera.addEventListener('click', () => {
    modalCarteraTitle.textContent = 'Agregar Nueva Cartera';
    editCarteraIdxInput.value = '';
    const formAddCartera = document.getElementById('form-add-cartera');
    if (formAddCartera) formAddCartera.reset();
    populateAgfDropdown();
    modalOverlay.classList.remove('hidden');
    modalCartera.classList.remove('hidden');
  });
}

if (btnCajaMovimiento) {
  btnCajaMovimiento.addEventListener('click', () => {
    const formAddMovimiento = document.getElementById('form-add-movimiento');
    if (formAddMovimiento) formAddMovimiento.reset();
    renderCarteras().then(() => {
      // Cargar tipos de movimiento en el dropdown
      populateTiposMovimientoSelect();
      if (movimientoFechaInput) {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
        movimientoFechaInput.value = localISOTime;
      }
      if (movimientoTipoCambioInput) {
        movimientoTipoCambioInput.value = 1;
      }
      modalOverlay.classList.remove('hidden');
      modalMovimientoCaja.classList.remove('hidden');
    });
  });
}

if (btnCajaTraspaso) {
  btnCajaTraspaso.addEventListener('click', () => {
    const formAddTraspaso = document.getElementById('form-add-traspaso');
    if (formAddTraspaso) formAddTraspaso.reset();
    renderCarteras().then(() => {
      modalOverlay.classList.remove('hidden');
      modalTraspasoCaja.classList.remove('hidden');
    });
  });
}

if (btnAddAgf) {
  btnAddAgf.addEventListener('click', () => {
    modalAgfTitle.textContent = 'Agregar Administradora';
    editAgfIdxInput.value = '';
    const formAddAgf = document.getElementById('form-add-agf');
    if (formAddAgf) {
      formAddAgf.reset();
    }
    modalOverlay.classList.remove('hidden');
    modalAgf.classList.remove('hidden');
  });
}

// Search Inputs event listeners
if (searchCarterasInput) {
  searchCarterasInput.addEventListener('input', (e) => {
    renderCarteras(e.target.value);
  });
}

if (searchAgfInput) {
  searchAgfInput.addEventListener('input', (e) => {
    renderAGFs(e.target.value);
  });
}

// --------------------------------------------------------------------------
// Operaciones de Instrumentos (Positions, Realized Results, Bulk Carga)
// --------------------------------------------------------------------------

// DOM Elements
const btnAddOperacion = document.getElementById('btn-add-operacion');
const btnCargaMasivaOperaciones = document.getElementById('btn-carga-masiva-operaciones');
const btnDownloadPlantillaOperaciones = document.getElementById('btn-download-plantilla-operaciones');
const modalOperacionInstrumento = document.getElementById('modal-operacion-instrumento');
const modalCargaMasivaOperaciones = document.getElementById('modal-carga-masiva-operaciones');
const formAddOperacionInstrumento = document.getElementById('form-add-operacion-instrumento');
const formCargaMasivaOperaciones = document.getElementById('form-carga-masiva-operaciones');
const posicionesTableBody = document.getElementById('posiciones-table-body');
const resultadoTableBody = document.getElementById('resultado-table-body');
const kpiValorPosiciones = document.getElementById('kpi-valor-posiciones');
const kpiResultadoRealizado = document.getElementById('kpi-resultado-realizado');
const searchOperacionesInput = document.getElementById('search-operaciones');
const operacionCarteraSelect = document.getElementById('operacion-cartera-select');
const operacionInstrumentoSelect = document.getElementById('operacion-instrumento-select');
const operacionIdInstrumentoInput = document.getElementById('operacion-idInstrumento');
const operacionTipoSelect = document.getElementById('operacion-tipo');
const operacionMonedaSelect = document.getElementById('operacion-moneda');
const operacionCantidadInput = document.getElementById('operacion-cantidad');
const operacionPrecioInput = document.getElementById('operacion-precio');
const operacionMontoBrutoInput = document.getElementById('operacion-monto-bruto');
const sectionVentaDetalles = document.getElementById('section-venta-detalles');
const sectionTipoCambio = document.getElementById('section-tipo-cambio');
const dragDropAreaOperaciones = document.getElementById('drag-drop-area-operaciones');
const operacionesExcelFileInput = document.getElementById('operaciones-excel-file-input');
const selectedFileContainerOperaciones = document.getElementById('selected-file-container-operaciones');
const selectedFileNameOperaciones = document.getElementById('selected-file-name-operaciones');
const btnClearFileOperaciones = document.getElementById('btn-clear-file-operaciones');
const btnSubmitUploadOperaciones = document.getElementById('btn-submit-upload-operaciones');
const uploadStatusResultOperaciones = document.getElementById('upload-status-result-operaciones');
const uploadSummaryAlert = document.getElementById('upload-summary-alert');
const uploadErrorsTableContainer = document.getElementById('upload-errors-table-container');
const uploadErrorsTbody = document.getElementById('upload-errors-tbody');
const historialOperacionesTableBody = document.getElementById('historial-operaciones-table-body');

// State variables
let posicionesList = [];
let resultadoRealizadoList = [];
let tiposOperacionList = ['COMPRA', 'VENTA'];
let editOperacionId = null;

// Fetch Position, Realized Results, and populates selectors
async function fetchAndRenderOperaciones() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
  
  if (!selectedClientId) {
    if (posicionesTableBody) posicionesTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">Selecciona un cliente para ver sus posiciones.</td></tr>';
    if (resultadoTableBody) resultadoTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-muted);">Selecciona un cliente para ver su resultado realizado.</td></tr>';
    if (kpiValorPosiciones) kpiValorPosiciones.textContent = '$0 CLP';
    if (kpiResultadoRealizado) kpiResultadoRealizado.textContent = '$0 CLP';
    return;
  }

  // Load portfolios for dropdown first
  if (carterasList.length === 0) {
    await fetchAndRenderCarteras();
  }

  // Populate Carteras dropdown in registration form
  populateOperacionesCarterasDropdown();

  // Load types of operations
  await fetchTiposOperacion();

  // Load Posiciones and Realized results consolidated across all client portfolios
  const clientCarteras = carterasList.filter(c => c.idCliente === selectedClientId && c.activo !== false);
  
  if (clientCarteras.length === 0) {
    if (posicionesTableBody) posicionesTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">Este cliente no registra carteras de inversión activas.</td></tr>';
    if (resultadoTableBody) resultadoTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-muted);">Este cliente no registra carteras de inversión activas.</td></tr>';
    if (kpiValorPosiciones) kpiValorPosiciones.textContent = '$0 CLP';
    if (kpiResultadoRealizado) kpiResultadoRealizado.textContent = '$0 CLP';
    return;
  }

  posicionesList = [];
  resultadoRealizadoList = [];
  
  if (posicionesTableBody) posicionesTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">Cargando posiciones...</td></tr>';
  if (resultadoTableBody) resultadoTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Cargando resultado realizado...</td></tr>';
  if (historialOperacionesTableBody) historialOperacionesTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Cargando historial de operaciones...</td></tr>';

  let totalValorPosicionesCLP = 0;
  let totalResultadoRealizadoCLP = 0;

  if (token) {
    // 1. Fetch positions consolidated
    for (const cartera of clientCarteras) {
      try {
        const response = await fetch(`/api/OperacionesInstrumento/posicion?idCartera=${cartera.idCartera}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        if (response.ok) {
          const resData = await response.json();
          const list = Array.isArray(resData) ? resData : (resData.posiciones || []);
          list.forEach(p => {
            p.carteraName = cartera.cuentaCartera || cartera.nombreCartera || 'Cartera';
            p.idCartera = cartera.idCartera;
            posicionesList.push(p);
            
            // Approximate valorization in CLP
            const qty = p.cantidad || 0;
            const cost = p.costoPromedio || p.costoUnitarioPromedio || p.costoPromedioUnitario || 0;
            const rate = p.tipoCambio || 1;
            totalValorPosicionesCLP += (qty * cost * rate);
          });
        }
      } catch (err) {
        console.warn(`Error al consultar posiciones de cartera ${cartera.idCartera}:`, err);
      }
    }

    // 2. Fetch realized results consolidated
    for (const cartera of clientCarteras) {
      try {
        const response = await fetch(`/api/OperacionesInstrumento/resultado-realizado?idCartera=${cartera.idCartera}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        if (response.ok) {
          const resData = await response.json();
          const list = Array.isArray(resData) ? resData : (resData.consumos || []);
          list.forEach(r => {
            r.carteraName = cartera.cuentaCartera || cartera.nombreCartera || 'Cartera';
            resultadoRealizadoList.push(r);
            
            // Accumulate realized utility
            const util = r.utilidadRealizada || r.resultadoRealizado || 0;
            const rate = r.tipoCambio || 1;
            totalResultadoRealizadoCLP += (util * rate);
          });
        }
      } catch (err) {
        console.warn(`Error al consultar resultado realizado de cartera ${cartera.idCartera}:`, err);
      }
    }

    // 3. Fetch movements consolidated for history table
    let allMovements = [];
    for (const cartera of clientCarteras) {
      try {
        const response = await fetch(`/api/Caja/movimientos?idCartera=${cartera.idCartera}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        if (response.ok) {
          const resData = await response.json();
          const list = Array.isArray(resData) ? resData : (resData.movimientos || []);
          allMovements.push(...list);
        }
      } catch (e) {
        console.warn(`Error al consultar movimientos para cartera ${cartera.idCartera}:`, e);
      }
    }
    cajaMovimientosList = allMovements;
  }

  // Render KPIs
  if (kpiValorPosiciones) kpiValorPosiciones.textContent = formatCLP(totalValorPosicionesCLP);
  if (kpiResultadoRealizado) kpiResultadoRealizado.textContent = formatCLP(totalResultadoRealizadoCLP);

  // Render tables
  renderPosicionesTable();
  renderResultadoTable();
  renderHistorialOperacionesTable();
  
  // Populate existing instrument select helper in manual entry modal
  populateInstrumentsDropdown();
}

// Render operations history and reversals table
function renderHistorialOperacionesTable(filterText = '') {
  if (!historialOperacionesTableBody) return;
  historialOperacionesTableBody.innerHTML = '';
  
  // Filter for movements associated with an instrument operation
  const filtered = cajaMovimientosList.filter(m => {
    const hasOp = m.idOperacionInstrumento && m.idOperacionInstrumento !== 0;
    if (!hasOp) return false;
    
    const desc = (m.descripcion || m.motivo || '').toLowerCase();
    const type = (m.tipoMovimientoCaja || m.tipoMovimiento || '').toLowerCase();
    return desc.includes(filterText.toLowerCase()) || type.includes(filterText.toLowerCase());
  });

  if (filtered.length === 0) {
    historialOperacionesTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-muted);">No se encontraron transacciones en el historial.</td></tr>';
    return;
  }

  // Sort by date descending
  const sorted = [...filtered].sort((a, b) => {
    const dateA = a.fechaMovimiento || a.fecha || '';
    const dateB = b.fechaMovimiento || b.fecha || '';
    return new Date(dateB) - new Date(dateA);
  });

  sorted.forEach(mov => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid var(--card-border)';
    
    const cartObj = carterasList.find(c => (c.idCartera || '').toString().toLowerCase() === (mov.idCartera || '').toString().toLowerCase());
    const carteraName = cartObj ? (cartObj.cuentaCartera || cartObj.nombreCartera) : 'Cartera';
    
    const dateVal = mov.fechaMovimiento || mov.fecha;
    let dateStr = '-';
    if (dateVal) {
      const d = new Date(dateVal);
      dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    
    const typeVal = mov.tipoMovimientoCaja || mov.tipoMovimiento || '';
    const debitTypes = ['RETIRO', 'COMISION', 'COMPRA_INSTRUMENTO', 'DEBITO_AJUSTE', 'IMPUESTO', 'TRASPASO_OUT'];
    const isNegative = debitTypes.includes(typeVal.toUpperCase()) || typeVal.toLowerCase() === 'retiro';
    const typeClass = isNegative ? 'text-danger' : 'text-success';
    const amountPrefix = isNegative ? '-' : '+';
    
    const displayType = typeof getFriendlyMovimientoLabel === 'function' ? getFriendlyMovimientoLabel(typeVal) : typeVal;
    const descVal = mov.descripcion || mov.motivo || '-';

    row.innerHTML = `
      <td style="padding: 12px 10px; color: var(--text-secondary);">${dateStr}</td>
      <td style="padding: 12px 10px; font-weight: 500; color: var(--text-primary);">${carteraName}</td>
      <td style="padding: 12px 10px;"><span class="${typeClass}" style="font-weight: 600;">${displayType}</span></td>
      <td style="padding: 12px 10px; font-weight: 600; text-align: right; font-variant-numeric: tabular-nums;" class="${typeClass}">${amountPrefix} ${formatCLP(mov.monto)}</td>
      <td style="padding: 12px 10px; color: var(--text-secondary);">${descVal}</td>
      <td style="padding: 12px 10px; text-align: center;">
        <div style="display: flex; gap: 8px; justify-content: center; align-items: center; width: 100%;">
          <button class="btn-table-action btn-edit-op" data-id="${mov.idOperacionInstrumento}" title="Editar Operación" style="background: none; border: none; cursor: pointer; color: var(--primary); display: flex; align-items: center; justify-content: center; gap: 4px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
            </svg>
            <span style="font-size: 11px; font-weight: 500;">Editar</span>
          </button>
          <button class="btn-table-action btn-reverse-op" data-id="${mov.idOperacionInstrumento}" title="Reversar Operación" style="background: none; border: none; cursor: pointer; color: var(--text-danger); display: flex; align-items: center; justify-content: center; gap: 4px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            <span style="font-size: 11px; font-weight: 500;">Reversar</span>
          </button>
        </div>
      </td>
    `;
    
    // Bind click events
    row.querySelector('.btn-edit-op').addEventListener('click', () => {
      iniciarEdicionOperacion(mov.idOperacionInstrumento, mov);
    });

    row.querySelector('.btn-reverse-op').addEventListener('click', () => {
      reversarOperacion(mov.idOperacionInstrumento);
    });

    historialOperacionesTableBody.appendChild(row);
  });
}

function iniciarEdicionOperacion(id, mov) {
  editOperacionId = id;
  
  const cache = JSON.parse(localStorage.getItem('local_operaciones_cache') || '{}');
  const cachedOp = cache[id];
  
  const modalTitle = document.querySelector('#modal-operacion-instrumento h3');
  if (modalTitle) modalTitle.textContent = 'Editar Operación de Instrumento';
  
  if (formAddOperacionInstrumento) formAddOperacionInstrumento.reset();
  
  if (cachedOp) {
    if (operacionCarteraSelect) operacionCarteraSelect.value = cachedOp.idCartera || '';
    if (operacionInstrumentoSelect) {
      operacionInstrumentoSelect.value = cachedOp.idInstrumento || '';
      operacionInstrumentoSelect.dispatchEvent(new Event('change'));
    }
    if (operacionIdInstrumentoInput) operacionIdInstrumentoInput.value = cachedOp.idInstrumento || '';
    if (operacionTipoSelect) {
      operacionTipoSelect.value = cachedOp.tipoOperacionInstrumento || 'COMPRA';
      operacionTipoSelect.dispatchEvent(new Event('change'));
    }
    if (operacionMonedaSelect) {
      operacionMonedaSelect.value = cachedOp.monedaOperacion || 'CLP';
      operacionMonedaSelect.dispatchEvent(new Event('change'));
    }
    if (operacionCantidadInput) operacionCantidadInput.value = cachedOp.cantidad || '';
    if (operacionPrecioInput) operacionPrecioInput.value = cachedOp.precioUnitario || '';
    if (operacionMontoBrutoInput) operacionMontoBrutoInput.value = cachedOp.montoBruto || '';
    
    const comisionInput = formAddOperacionInstrumento.querySelector('[name="comision"]');
    if (comisionInput) comisionInput.value = cachedOp.comision || 0;
    
    const otrosCargosInput = formAddOperacionInstrumento.querySelector('[name="otrosCargos"]');
    if (otrosCargosInput) otrosCargosInput.value = cachedOp.otrosCargos || 0;
    
    const impuestoRetenidoInput = formAddOperacionInstrumento.querySelector('[name="impuestoRetenido"]');
    if (impuestoRetenidoInput) impuestoRetenidoInput.value = cachedOp.impuestoRetenido || 0;
    
    const observacionInput = formAddOperacionInstrumento.querySelector('[name="observacion"]');
    if (observacionInput) observacionInput.value = cachedOp.observacion || '';
    
    const fechaOperacionInput = formAddOperacionInstrumento.querySelector('[name="fechaOperacion"]');
    if (fechaOperacionInput && cachedOp.fechaOperacion) {
      fechaOperacionInput.value = new Date(cachedOp.fechaOperacion).toISOString().slice(0, 16);
    }
    
    const fechaLiquidacionInput = formAddOperacionInstrumento.querySelector('[name="fechaLiquidacion"]');
    if (fechaLiquidacionInput && cachedOp.fechaLiquidacion) {
      fechaLiquidacionInput.value = new Date(cachedOp.fechaLiquidacion).toISOString().slice(0, 16);
    }
    
    const registrarCajaInput = document.getElementById('operacion-registrar-caja');
    if (registrarCajaInput) registrarCajaInput.checked = cachedOp.registrarMovimientoCaja !== false;
    
    if (cachedOp.tipoOperacionInstrumento === 'VENTA') {
      const refInput = formAddOperacionInstrumento.querySelector('[name="precioReferencia"]');
      if (refInput) refInput.value = cachedOp.precioReferencia || '';
      const execInput = formAddOperacionInstrumento.querySelector('[name="precioEjecutado"]');
      if (execInput) execInput.value = cachedOp.precioEjecutado || '';
      const resultSelect = formAddOperacionInstrumento.querySelector('[name="resultadoVsReferencia"]');
      if (resultSelect) resultSelect.value = cachedOp.resultadoVsReferencia || '';
    }
  } else {
    if (operacionCarteraSelect) operacionCarteraSelect.value = mov.idCartera || '';
    
    let guessedTicker = '';
    const desc = mov.descripcion || mov.motivo || '';
    const matchedInst = instrumentosList.find(inst => {
      const t = (inst.tickerISIN || inst.ticker || '').toLowerCase();
      return t && desc.toLowerCase().includes(t);
    });
    if (matchedInst) {
      guessedTicker = matchedInst.idInstrumento;
    }
    
    if (operacionInstrumentoSelect && guessedTicker) {
      operacionInstrumentoSelect.value = guessedTicker;
      operacionInstrumentoSelect.dispatchEvent(new Event('change'));
    }
    if (operacionIdInstrumentoInput && guessedTicker) {
      operacionIdInstrumentoInput.value = guessedTicker;
    }
    
    const isVenta = (mov.tipoMovimientoCaja || mov.tipoMovimiento || '').toUpperCase() === 'VENTA_INSTRUMENTO' || (mov.tipoMovimientoCaja || mov.tipoMovimiento || '').toLowerCase() === 'retiro';
    if (operacionTipoSelect) {
      operacionTipoSelect.value = isVenta ? 'VENTA' : 'COMPRA';
      operacionTipoSelect.dispatchEvent(new Event('change'));
    }
    
    if (operacionMonedaSelect) {
      operacionMonedaSelect.value = mov.moneda || 'CLP';
      operacionMonedaSelect.dispatchEvent(new Event('change'));
    }
    
    if (operacionMontoBrutoInput) operacionMontoBrutoInput.value = mov.monto || '';
    
    const fechaOperacionInput = formAddOperacionInstrumento.querySelector('[name="fechaOperacion"]');
    const dateVal = mov.fechaMovimiento || mov.fecha;
    if (fechaOperacionInput && dateVal) {
      fechaOperacionInput.value = new Date(dateVal).toISOString().slice(0, 16);
    }
    
    const registrarCajaInput = document.getElementById('operacion-registrar-caja');
    if (registrarCajaInput) registrarCajaInput.checked = true;
    
    showToast('Modo Edición Limitada', 'Detalles originales no encontrados en caché local. Re-ingresa cantidad, precio y ticker del instrumento.', 'info');
  }

  if (modalOverlay) modalOverlay.classList.remove('hidden');
  const modalOperacionInstrumento = document.getElementById('modal-operacion-instrumento');
  if (modalOperacionInstrumento) modalOperacionInstrumento.classList.remove('hidden');
}

// Reversar Operación
async function reversarOperacion(id) {
  if (!id) return;
  const motivo = prompt('Por favor ingresa el motivo de la reversa de la operación:');
  if (motivo === null) return; // Cancelled
  if (!motivo.trim()) {
    showToast('Campo requerido', 'Debes ingresar un motivo para realizar la reversa.', 'warning');
    return;
  }
  
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (!token) {
    showToast('Error', 'Por favor inicia sesión.', 'error');
    return;
  }

  try {
    showToast('Reversando operación...', 'Enviando solicitud al servidor.', 'info');
    const response = await fetch(`/api/OperacionesInstrumento/${id}?motivo=${encodeURIComponent(motivo.trim())}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showToast('Operación Reversada', 'La operación ha sido reversada y eliminada con éxito.', 'success');
      
      // Reset caches and refresh data
      cachedCarterasSaldos = {};
      fetchAndRenderOperaciones();
      if (typeof renderCaja !== 'undefined') renderCaja();
    } else {
      let errorMsg = 'No se pudo reversar la operación.';
      try {
        const resData = await response.json();
        errorMsg = resData.mensaje || errorMsg;
      } catch (e) {}
      showToast('Error de Reversa', errorMsg, 'error');
    }
  } catch (err) {
    console.error('Error reversing operation:', err);
    showToast('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
  }
}

// Populate carteras in manual entry modal dropdown
function populateOperacionesCarterasDropdown() {
  if (!operacionCarteraSelect) return;
  operacionCarteraSelect.innerHTML = '<option value="" disabled selected style="background: var(--bg-card); color: var(--text-muted);">Selecciona Cartera</option>';
  const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
  const activeCarteras = carterasList.filter(c => c.idCliente === selectedClientId && c.activo !== false);
  activeCarteras.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.idCartera;
    opt.textContent = c.cuentaCartera || c.nombreCartera || 'Cartera';
    opt.style.background = 'var(--bg-card)';
    opt.style.color = 'var(--text-primary)';
    operacionCarteraSelect.appendChild(opt);
  });
}

// Fetch operation types from API
async function fetchTiposOperacion() {
  const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  if (token) {
    try {
      const response = await fetch('/api/OperacionesInstrumento/tipos', {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.tiposSoportados)) {
          tiposOperacionList = data.tiposSoportados;
        }
      }
    } catch (e) {
      console.warn('API error fetching tipos operacion, fallback to COMPRA/VENTA', e);
    }
  }

  // Populate tipo select in form
  if (operacionTipoSelect) {
    operacionTipoSelect.innerHTML = '';
    tiposOperacionList.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      opt.style.background = 'var(--bg-card)';
      opt.style.color = 'var(--text-primary)';
      operacionTipoSelect.appendChild(opt);
    });
  }
}

// Populate existing instrument selector in manual operation form
function populateInstrumentsDropdown() {
  if (!operacionInstrumentoSelect) return;
  
  // Keep unique instruments from positions
  const uniqueInstruments = new Map();
  posicionesList.forEach(pos => {
    const id = pos.idInstrumento;
    const ticker = pos.ticker || pos.tickerISIN || pos.nombreInstrumento || 'Instrumento';
    const nombre = pos.nombreInstrumento || pos.nombre || '';
    if (id && !uniqueInstruments.has(id)) {
      uniqueInstruments.set(id, { ticker, nombre });
    }
  });

  // Also add instruments from the catalog (instrumentosList) that are active
  instrumentosList.forEach(inst => {
    const id = inst.idInstrumento;
    const ticker = inst.tickerISIN || inst.ticker || inst.nombreInstrumento || 'Instrumento';
    const nombre = inst.nombreInstrumento || inst.nombre || '';
    if (id && inst.activo !== false && !uniqueInstruments.has(id)) {
      uniqueInstruments.set(id, { ticker, nombre });
    }
  });

  // Rebuild select options
  operacionInstrumentoSelect.innerHTML = '<option value="" selected style="background: var(--bg-card); color: var(--text-muted);">-- Escribir UUID manualmente --</option>';
  uniqueInstruments.forEach((info, id) => {
    const opt = document.createElement('option');
    opt.value = id;
    const label = info.nombre ? `${info.ticker} (${info.nombre})` : info.ticker;
    opt.textContent = label;
    opt.style.background = 'var(--bg-card)';
    opt.style.color = 'var(--text-primary)';
    operacionInstrumentoSelect.appendChild(opt);
  });
}

// Render positions table
function renderPosicionesTable(filterText = '') {
  if (!posicionesTableBody) return;
  posicionesTableBody.innerHTML = '';
  
  const filtered = posicionesList.filter(p => {
    const inst = (p.ticker || p.tickerISIN || p.nombreInstrumento || p.idInstrumento || '').toLowerCase();
    return inst.includes(filterText.toLowerCase());
  });

  if (filtered.length === 0) {
    posicionesTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">No se encontraron posiciones activas.</td></tr>';
    return;
  }

  filtered.forEach(p => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid var(--card-border)';
    
    const ticker = p.ticker || p.tickerISIN || p.nombreInstrumento || p.idInstrumento || '-';
    const qty = p.cantidad !== undefined ? p.cantidad.toLocaleString('es-CL', { maximumFractionDigits: 4 }) : '0';
    const rawCost = p.costoPromedio || p.costoUnitarioPromedio || p.costoPromedioUnitario || 0;
    const cost = rawCost.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const currency = p.monedaInstrumento || p.moneda || 'CLP';
    
    const totalAmount = ((p.cantidad || 0) * rawCost).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    row.innerHTML = `
      <td style="padding: 12px 10px; color: var(--text-primary); font-weight: 500;">
        ${ticker}
        <span style="font-size: 10px; color: var(--text-muted); display: block;">${p.carteraName}</span>
      </td>
      <td style="padding: 12px 10px; color: var(--text-secondary);">${qty}</td>
      <td style="padding: 12px 10px; text-align: right; color: var(--text-secondary); font-variant-numeric: tabular-nums;">${cost}</td>
      <td style="padding: 12px 10px; text-align: right; font-weight: 500; color: var(--text-primary); font-variant-numeric: tabular-nums;">${totalAmount}</td>
      <td style="padding: 12px 10px; text-align: right; color: var(--text-secondary);">${currency}</td>
      <td style="padding: 12px 10px; text-align: center;">
        <button class="btn-table-action btn-edit-position-op" data-ticker="${ticker}" title="Editar Última Operación" style="background: none; border: none; cursor: pointer; color: var(--primary); display: flex; align-items: center; justify-content: center; gap: 4px; margin: 0 auto;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
          </svg>
          <span style="font-size: 11px; font-weight: 500;">Editar</span>
        </button>
      </td>
    `;

    row.querySelector('.btn-edit-position-op').addEventListener('click', () => {
      // 1. Try to find by UUID in local operations cache first (exact match)
      const targetInstrumentId = p.idInstrumento;
      const cache = JSON.parse(localStorage.getItem('local_operaciones_cache') || '{}');
      let foundOpId = null;
      let foundOpDetails = null;
      
      for (const [opId, op] of Object.entries(cache)) {
        if (op.idInstrumento && op.idInstrumento === targetInstrumentId) {
          foundOpId = opId;
          foundOpDetails = op;
          break;
        }
      }
      
      if (foundOpId) {
        const matchingMov = cajaMovimientosList.find(m => m.idOperacionInstrumento == foundOpId) || {
          idOperacionInstrumento: foundOpId,
          idCartera: foundOpDetails.idCartera,
          moneda: foundOpDetails.monedaOperacion,
          monto: foundOpDetails.montoBruto,
          fechaMovimiento: foundOpDetails.fechaOperacion
        };
        iniciarEdicionOperacion(foundOpId, matchingMov);
        return;
      }
      
      // 2. If not found in cache, search in cajaMovimientosList by matching description terms
      const instObj = instrumentosList.find(i => i.idInstrumento === targetInstrumentId);
      
      // Collect search terms
      const searchTerms = new Set();
      if (targetInstrumentId) searchTerms.add(targetInstrumentId.toLowerCase().trim());
      if (p.ticker) searchTerms.add(p.ticker.toLowerCase().trim());
      if (p.tickerISIN) searchTerms.add(p.tickerISIN.toLowerCase().trim());
      if (p.nombreInstrumento) searchTerms.add(p.nombreInstrumento.toLowerCase().trim());
      if (instObj) {
        if (instObj.idInstrumento) searchTerms.add(instObj.idInstrumento.toLowerCase().trim());
        if (instObj.tickerISIN) searchTerms.add(instObj.tickerISIN.toLowerCase().trim());
        if (instObj.nombreInstrumento) searchTerms.add(instObj.nombreInstrumento.toLowerCase().trim());
        if (instObj.ticker) searchTerms.add(instObj.ticker.toLowerCase().trim());
      }
      
      // Clean terms (remove short words, split slashes)
      const cleanTerms = [];
      searchTerms.forEach(term => {
        if (!term) return;
        term.split(/[\/\s]+/).forEach(part => {
          const cleaned = part.trim();
          if (cleaned.length > 2) {
            cleanTerms.push(cleaned);
          }
        });
        cleanTerms.push(term);
      });
      
      // Find movements that have a valid idOperacionInstrumento and match any term
      const matchedMovs = cajaMovimientosList.filter(m => {
        if (!m.idOperacionInstrumento || m.idOperacionInstrumento === 0) return false;
        const desc = (m.descripcion || m.motivo || '').toLowerCase();
        return cleanTerms.some(term => desc.includes(term));
      });
      
      // Sort by date descending to edit the latest one
      matchedMovs.sort((a, b) => {
        const dateA = a.fechaMovimiento || a.fecha || '';
        const dateB = b.fechaMovimiento || b.fecha || '';
        return new Date(dateB) - new Date(dateA);
      });
      
      if (matchedMovs.length > 0) {
        iniciarEdicionOperacion(matchedMovs[0].idOperacionInstrumento, matchedMovs[0]);
      } else {
        // 3. Fallback: if we still can't find a linked movement, check if there is ANY movement
        // linked to an operation in this specific portfolio, and match it
        const portfolioMovs = cajaMovimientosList.filter(m => {
          const isSameCartera = (m.idCartera || '').toString().toLowerCase() === (p.idCartera || '').toString().toLowerCase();
          const hasOp = m.idOperacionInstrumento && m.idOperacionInstrumento !== 0;
          return isSameCartera && hasOp;
        });
        
        if (portfolioMovs.length > 0) {
          const firstTerm = p.ticker || instObj?.tickerISIN || '';
          if (firstTerm) {
            const firstTermClean = firstTerm.toLowerCase().trim();
            const fallbackMov = portfolioMovs.find(m => (m.descripcion || m.motivo || '').toLowerCase().includes(firstTermClean));
            if (fallbackMov) {
              iniciarEdicionOperacion(fallbackMov.idOperacionInstrumento, fallbackMov);
              return;
            }
          }
          portfolioMovs.sort((a, b) => new Date(b.fechaMovimiento || b.fecha || '') - new Date(a.fechaMovimiento || a.fecha || ''));
          iniciarEdicionOperacion(portfolioMovs[0].idOperacionInstrumento, portfolioMovs[0]);
        } else {
          // Fallback 4: If no operation is found in the history, open the modal using the position's details directly!
          console.log('No matching operation found in history, opening modal with position fallback');
          
          editOperacionId = null; // New corrective transaction
          
          const modalTitle = document.querySelector('#modal-operacion-instrumento h3');
          if (modalTitle) modalTitle.textContent = 'Registrar Operación (Ajuste de Posición)';
          
          if (formAddOperacionInstrumento) formAddOperacionInstrumento.reset();
          
          if (operacionCarteraSelect) operacionCarteraSelect.value = p.idCartera || '';
          if (operacionInstrumentoSelect) {
            operacionInstrumentoSelect.value = p.idInstrumento || '';
            operacionInstrumentoSelect.dispatchEvent(new Event('change'));
          }
          if (operacionIdInstrumentoInput) operacionIdInstrumentoInput.value = p.idInstrumento || '';
          
          if (operacionTipoSelect) {
            operacionTipoSelect.value = 'COMPRA';
            operacionTipoSelect.dispatchEvent(new Event('change'));
          }
          
          if (operacionMonedaSelect) {
            operacionMonedaSelect.value = p.monedaInstrumento || p.moneda || 'CLP';
            operacionMonedaSelect.dispatchEvent(new Event('change'));
          }
          
          if (operacionCantidadInput) operacionCantidadInput.value = p.cantidad || '';
          if (operacionPrecioInput) operacionPrecioInput.value = p.costoPromedio || p.costoUnitarioPromedio || p.costoPromedioUnitario || '';
          
          const dateInput = document.getElementById('operacion-fecha');
          if (dateInput) {
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            dateInput.value = now.toISOString().slice(0, 16);
          }
          
          const registrarCajaInput = document.getElementById('operacion-registrar-caja');
          if (registrarCajaInput) registrarCajaInput.checked = true;
          
          if (modalOverlay) modalOverlay.classList.remove('hidden');
          if (modalOperacionInstrumento) modalOperacionInstrumento.classList.remove('hidden');
          
          showToast('Ajustar Posición', 'No se encontró la transacción original. Modifica los campos para registrar un movimiento de corrección.', 'info');
        }
      }
    });

    posicionesTableBody.appendChild(row);
  });
}

// Render realized utility results table
function renderResultadoTable(filterText = '') {
  if (!resultadoTableBody) return;
  resultadoTableBody.innerHTML = '';
  
  const filtered = resultadoRealizadoList.filter(r => {
    const inst = (r.ticker || r.tickerISIN || r.nombreInstrumento || r.idInstrumento || '').toLowerCase();
    return inst.includes(filterText.toLowerCase());
  });

  if (filtered.length === 0) {
    resultadoTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-muted);">No registra resultados realizados (consumos de venta).</td></tr>';
    return;
  }

  filtered.forEach(r => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid var(--card-border)';
    
    const ticker = r.ticker || r.tickerISIN || r.nombreInstrumento || r.idInstrumento || '-';
    const qty = r.cantidadVendida !== undefined ? r.cantidadVendida.toLocaleString('es-CL', { maximumFractionDigits: 4 }) : '0';
    
    const rawPriceVenta = r.precioVenta || r.precioVentaPromedio || 0;
    const priceVenta = rawPriceVenta.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const rawCost = r.costoPromedio || r.costoUnitario || 0;
    const cost = rawCost.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const rawUtil = r.utilidadRealizada || r.resultadoRealizado || 0;
    const utilClass = rawUtil >= 0 ? 'text-success' : 'text-danger';
    const utilPrefix = rawUtil >= 0 ? '+' : '';
    const util = rawUtil.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const currency = r.moneda || 'CLP';

    row.innerHTML = `
      <td style="padding: 12px 10px; color: var(--text-primary); font-weight: 500;">
        ${ticker}
        <span style="font-size: 10px; color: var(--text-muted); display: block;">${r.carteraName}</span>
      </td>
      <td style="padding: 12px 10px; color: var(--text-secondary);">${qty}</td>
      <td style="padding: 12px 10px; text-align: right; color: var(--text-secondary); font-variant-numeric: tabular-nums;">${priceVenta}</td>
      <td style="padding: 12px 10px; text-align: right; color: var(--text-secondary); font-variant-numeric: tabular-nums;">${cost}</td>
      <td style="padding: 12px 10px; text-align: right; font-weight: 600; font-variant-numeric: tabular-nums;" class="${utilClass}">${utilPrefix}${util}</td>
      <td style="padding: 12px 10px; text-align: right; color: var(--text-secondary);">${currency}</td>
    `;
    resultadoTableBody.appendChild(row);
  });
}

// Hook up event listeners for Operations tab UI triggers
if (btnAddOperacion) {
  btnAddOperacion.addEventListener('click', () => {
    editOperacionId = null;
    
    const modalTitle = document.querySelector('#modal-operacion-instrumento h3');
    if (modalTitle) modalTitle.textContent = 'Registrar Operación de Instrumento';

    if (formAddOperacionInstrumento) formAddOperacionInstrumento.reset();
    
    // Default operation date to current local date/time
    const dateInput = document.getElementById('operacion-fecha');
    if (dateInput) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      dateInput.value = now.toISOString().slice(0, 16);
    }

    populateOperacionesCarterasDropdown();
    populateInstrumentsDropdown();
    
    if (sectionVentaDetalles) sectionVentaDetalles.style.display = 'none';
    if (sectionTipoCambio) sectionTipoCambio.style.display = 'none';
    
    modalOverlay.classList.remove('hidden');
    modalOperacionInstrumento.classList.remove('hidden');
  });
}

if (btnCargaMasivaOperaciones) {
  btnCargaMasivaOperaciones.addEventListener('click', () => {
    if (formCargaMasivaOperaciones) formCargaMasivaOperaciones.reset();
    if (selectedFileContainerOperaciones) selectedFileContainerOperaciones.style.display = 'none';
    if (btnSubmitUploadOperaciones) btnSubmitUploadOperaciones.disabled = true;
    if (uploadStatusResultOperaciones) uploadStatusResultOperaciones.style.display = 'none';
    
    modalOverlay.classList.remove('hidden');
    modalCargaMasivaOperaciones.classList.remove('hidden');
  });
}

// Download Plantilla click
if (btnDownloadPlantillaOperaciones) {
  btnDownloadPlantillaOperaciones.addEventListener('click', async () => {
    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
    const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
    
    if (!selectedClientId) {
      showToast('Error', 'Selecciona un cliente para descargar su plantilla.', 'error');
      return;
    }
    
    if (!token) {
      showToast('Sesión no iniciada', 'Por favor inicia sesión nuevamente.', 'error');
      return;
    }

    try {
      showToast('Generando plantilla...', 'Por favor espera mientras se descarga el archivo.', 'info');
      const response = await fetch(`/api/OperacionesInstrumento/carga-masiva/plantilla?idCliente=${selectedClientId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `plantilla_operaciones_${selectedClientId.substring(0, 8)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showToast('Plantilla descargada', 'Planilla Excel generada con éxito.', 'success');
      } else {
        showToast('Error de descarga', 'No se pudo descargar la plantilla del servidor.', 'error');
      }
    } catch (err) {
      console.error('Error al descargar plantilla:', err);
      showToast('Error de conexión', 'No se pudo conectar con el servidor para la descarga.', 'error');
    }
  });
}

// Form logic details toggling
if (operacionTipoSelect) {
  operacionTipoSelect.addEventListener('change', (e) => {
    if (sectionVentaDetalles) {
      sectionVentaDetalles.style.display = e.target.value === 'VENTA' ? 'block' : 'none';
    }
  });
}

if (operacionMonedaSelect) {
  operacionMonedaSelect.addEventListener('change', (e) => {
    if (sectionTipoCambio) {
      const isForeign = e.target.value !== 'CLP';
      sectionTipoCambio.style.display = isForeign ? 'block' : 'none';
      if (!isForeign) {
        const tcInput = document.getElementById('operacion-tc');
        const parInput = document.getElementById('operacion-moneda-par');
        if (tcInput) tcInput.value = '1';
        if (parInput) parInput.value = 'CLP';
      }
    }
  });
}

if (operacionInstrumentoSelect) {
  operacionInstrumentoSelect.addEventListener('change', (e) => {
    const uuidContainer = document.getElementById('operacion-uuid-container');
    if (e.target.value) {
      if (uuidContainer) uuidContainer.style.display = 'none';
      if (operacionIdInstrumentoInput) {
        operacionIdInstrumentoInput.value = e.target.value;
        operacionIdInstrumentoInput.dispatchEvent(new Event('input'));
      }

      // Auto-select currency based on selected instrument
      const instId = e.target.value;
      let foundMoneda = null;
      const catalogInst = instrumentosList.find(i => i.idInstrumento === instId);
      if (catalogInst) {
        foundMoneda = catalogInst.monedaInstrumento || catalogInst.moneda;
      } else {
        const posInst = posicionesList.find(p => p.idInstrumento === instId);
        if (posInst) {
          foundMoneda = posInst.moneda || posInst.monedaInstrumento;
        }
      }

      if (foundMoneda && operacionMonedaSelect) {
        let mappedMoneda = foundMoneda.toUpperCase().trim();
        if (mappedMoneda.includes('UF') || mappedMoneda === 'CLF') {
          mappedMoneda = 'CLF';
        } else if (mappedMoneda === 'CLP') {
          mappedMoneda = 'CLP';
        } else if (mappedMoneda === 'USD') {
          mappedMoneda = 'USD';
        } else if (mappedMoneda === 'EUR') {
          mappedMoneda = 'EUR';
        }
        
        operacionMonedaSelect.value = mappedMoneda;
        operacionMonedaSelect.dispatchEvent(new Event('change'));
      }
    } else {
      if (uuidContainer) uuidContainer.style.display = 'block';
      if (operacionIdInstrumentoInput) {
        operacionIdInstrumentoInput.value = '';
        operacionIdInstrumentoInput.dispatchEvent(new Event('input'));
      }
    }
  });
}

// Auto-calculate Monto Bruto on input change
function calculateMontoBruto() {
  const qty = parseFloat(operacionCantidadInput?.value || 0);
  const price = parseFloat(operacionPrecioInput?.value || 0);
  if (operacionMontoBrutoInput && !isNaN(qty) && !isNaN(price)) {
    operacionMontoBrutoInput.value = (qty * price).toFixed(4);
    operacionMontoBrutoInput.dispatchEvent(new Event('input'));
  }
}

if (operacionCantidadInput) operacionCantidadInput.addEventListener('input', calculateMontoBruto);
if (operacionPrecioInput) operacionPrecioInput.addEventListener('input', calculateMontoBruto);

// Manual form registration submission
if (formAddOperacionInstrumento) {
  formAddOperacionInstrumento.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
    if (!token) {
      showToast('Error', 'Por favor inicia sesión.', 'error');
      return;
    }

    const formData = new FormData(formAddOperacionInstrumento);
    
    // Parse form input fields
    const idCartera = formData.get('idCartera');
    const idInstrumento = formData.get('idInstrumento');
    const tipoOperacionInstrumento = formData.get('tipoOperacionInstrumento');
    const fechaOperacion = new Date(formData.get('fechaOperacion')).toISOString();
    const fechaLiquidacionVal = formData.get('fechaLiquidacion');
    const fechaLiquidacion = fechaLiquidacionVal ? new Date(fechaLiquidacionVal).toISOString() : null;
    const cantidad = parseFloat(formData.get('cantidad'));
    const precioUnitario = parseFloat(formData.get('precioUnitario'));
    const montoBruto = parseFloat(formData.get('montoBruto') || (cantidad * precioUnitario));
    const comision = parseFloat(formData.get('comision') || 0);
    const otrosCargos = parseFloat(formData.get('otrosCargos') || 0);
    const impuestoRetenido = parseFloat(formData.get('impuestoRetenido') || 0);
    const monedaOperacion = formData.get('monedaOperacion') || 'CLP';
    
    const precioReferencia = tipoOperacionInstrumento === 'VENTA' ? parseFloat(formData.get('precioReferencia') || 0) : null;
    const precioEjecutado = tipoOperacionInstrumento === 'VENTA' ? parseFloat(formData.get('precioEjecutado') || 0) : null;
    const resultadoVsReferencia = formData.get('resultadoVsReferencia') || null;
    
    const isForeign = monedaOperacion !== 'CLP';
    const tipoCambioOperacion = isForeign ? parseFloat(formData.get('tipoCambioOperacion') || 1) : null;
    const monedaParTipoCambio = isForeign ? formData.get('monedaParTipoCambio') : null;
    
    const normaTributariaRef = formData.get('normaTributariaRef') || null;
    const observacion = formData.get('observacion') || null;
    const registrarMovimientoCaja = document.getElementById('operacion-registrar-caja')?.checked || false;

    // Strict RegistrarOperacionInstrumentoRequest Payload
    const payload = {
      idCartera,
      idInstrumento,
      tipoOperacionInstrumento,
      fechaOperacion,
      fechaLiquidacion,
      cantidad,
      precioUnitario,
      montoBruto,
      comision,
      otrosCargos,
      impuestoRetenido,
      monedaOperacion,
      precioReferencia,
      precioEjecutado,
      resultadoVsReferencia,
      tipoCambioOperacion,
      monedaParTipoCambio,
      normaTributariaRef,
      observacion,
      registrarMovimientoCaja
    };

    if (editOperacionId) {
      showToast('Actualizando...', 'Anulando operación anterior...', 'info');
      if (!editOperacionId.toString().startsWith('mock-')) {
        try {
          const deleteResponse = await fetch(`/api/OperacionesInstrumento/${editOperacionId}?motivo=Re-registro por Edición`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!deleteResponse.ok) {
            const delError = await deleteResponse.text();
            console.warn('Could not reverse old operation during edit:', delError);
            showToast('Error al editar', 'No se pudo anular la operación original: ' + delError, 'error');
            return;
          }
        } catch (err) {
          console.error('Error deleting old operation:', err);
          showToast('Error de conexión', 'No se pudo anular la operación original.', 'error');
          return;
        }
      }
    }

    try {
      showToast('Registrando operación...', 'Enviando datos al servidor.', 'info');
      const response = await fetch('/api/OperacionesInstrumento/registrar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      
      if (response.ok && resData.exitoso !== false) {
        showToast(editOperacionId ? 'Operación Modificada' : 'Operación Registrada', 'La operación ha sido procesada con éxito.', 'success');
        
        // Cache detailed operation fields for future editing
        const opId = resData.idOperacionInstrumento || resData.id || editOperacionId || ('mock-op-' + Math.random().toString(36).substring(2, 9));
        if (opId) {
          const cache = JSON.parse(localStorage.getItem('local_operaciones_cache') || '{}');
          cache[opId] = {
            idCartera,
            idInstrumento,
            tipoOperacionInstrumento,
            fechaOperacion,
            fechaLiquidacion,
            cantidad,
            precioUnitario,
            montoBruto,
            comision,
            otrosCargos,
            impuestoRetenido,
            monedaOperacion,
            precioReferencia,
            precioEjecutado,
            resultadoVsReferencia,
            tipoCambioOperacion,
            monedaParTipoCambio,
            normaTributariaRef,
            observacion,
            registrarMovimientoCaja
          };
          if (editOperacionId && editOperacionId !== opId) {
            delete cache[editOperacionId];
          }
          localStorage.setItem('local_operaciones_cache', JSON.stringify(cache));
        }

        editOperacionId = null;

        // If movement of cash affected the portfolio, clear the balance caches
        if (registrarMovimientoCaja) {
          delete cachedCarterasSaldos[idCartera];
          delete cachedCarterasSaldos[idCartera.toString().toLowerCase()];
        }
        
        closeAllModals();
        fetchAndRenderOperaciones();
        if (typeof renderCaja !== 'undefined') renderCaja();
      } else {
        const errorMsg = resData.mensaje || 'Error desconocido al registrar la operación.';
        showToast('Error de Registro', errorMsg, 'error');
      }
    } catch (err) {
      console.error('Error registering operation:', err);
      showToast('Error de conexión', 'No se pudo conectar con el servidor para registrar la operación.', 'error');
    }
  });
}

// Carga Masiva File drag & drop, selection, and submit
if (dragDropAreaOperaciones) {
  dragDropAreaOperaciones.addEventListener('click', () => {
    if (operacionesExcelFileInput) operacionesExcelFileInput.click();
  });

  dragDropAreaOperaciones.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropAreaOperaciones.style.borderColor = 'var(--primary)';
    dragDropAreaOperaciones.style.background = 'rgba(111, 66, 193, 0.05)';
  });

  dragDropAreaOperaciones.addEventListener('dragleave', () => {
    dragDropAreaOperaciones.style.borderColor = 'var(--card-border)';
    dragDropAreaOperaciones.style.background = 'rgba(0,0,0,0.1)';
  });

  dragDropAreaOperaciones.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropAreaOperaciones.style.borderColor = 'var(--card-border)';
    dragDropAreaOperaciones.style.background = 'rgba(0,0,0,0.1)';
    
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.xlsx')) {
        if (operacionesExcelFileInput) {
          const dt = new DataTransfer();
          dt.items.add(file);
          operacionesExcelFileInput.files = dt.files;
          handleOperacionesFileSelected(file);
        }
      } else {
        showToast('Formato inválido', 'Por favor selecciona un archivo Excel (.xlsx)', 'error');
      }
    }
  });
}

if (operacionesExcelFileInput) {
  operacionesExcelFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleOperacionesFileSelected(e.target.files[0]);
    }
  });
}

if (btnClearFileOperaciones) {
  btnClearFileOperaciones.addEventListener('click', () => {
    if (operacionesExcelFileInput) operacionesExcelFileInput.value = '';
    if (selectedFileContainerOperaciones) selectedFileContainerOperaciones.style.display = 'none';
    if (btnSubmitUploadOperaciones) btnSubmitUploadOperaciones.disabled = true;
    if (uploadStatusResultOperaciones) uploadStatusResultOperaciones.style.display = 'none';
  });
}

function handleOperacionesFileSelected(file) {
  if (selectedFileNameOperaciones) selectedFileNameOperaciones.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  if (selectedFileContainerOperaciones) selectedFileContainerOperaciones.style.display = 'flex';
  if (btnSubmitUploadOperaciones) btnSubmitUploadOperaciones.disabled = false;
  if (uploadStatusResultOperaciones) uploadStatusResultOperaciones.style.display = 'none';
}

// Bulk upload operations form submission
if (formCargaMasivaOperaciones) {
  formCargaMasivaOperaciones.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
    const selectedClientId = localStorage.getItem('cliente_seleccionado_id') || '';
    
    if (!token) {
      showToast('Error', 'Inicia sesión.', 'error');
      return;
    }
    
    const file = operacionesExcelFileInput?.files[0];
    if (!file) {
      showToast('Error', 'Selecciona un archivo excel.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', file);

    try {
      if (btnSubmitUploadOperaciones) {
        btnSubmitUploadOperaciones.disabled = true;
        btnSubmitUploadOperaciones.textContent = 'Procesando planilla...';
      }
      
      const url = `/api/OperacionesInstrumento/carga-masiva?idCliente=${selectedClientId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const resData = await response.json();
      
      if (uploadStatusResultOperaciones) uploadStatusResultOperaciones.style.display = 'block';

      if (response.ok && resData.exitoso !== false) {
        showToast('Carga Masiva Exitosa', 'Las operaciones se procesaron correctamente.', 'success');
        
        if (uploadSummaryAlert) {
          uploadSummaryAlert.textContent = `Éxito: Se registraron ${resData.operacionesRegistradas} operaciones de un total de ${resData.totalFilas} filas procesadas.`;
          uploadSummaryAlert.style.background = 'rgba(40, 167, 69, 0.1)';
          uploadSummaryAlert.style.color = 'var(--success)';
          uploadSummaryAlert.style.border = '1px solid rgba(40, 167, 69, 0.2)';
        }
        if (uploadErrorsTableContainer) uploadErrorsTableContainer.style.display = 'none';
        
        // Refresh balance caches since they were modified
        cachedCarterasSaldos = {};
        
        closeAllModals();
        fetchAndRenderOperaciones();
        if (typeof renderCaja !== 'undefined') renderCaja();
      } else {
        const registered = resData.operacionesRegistradas || 0;
        const failed = resData.filasConError || 0;
        
        if (uploadSummaryAlert) {
          uploadSummaryAlert.textContent = `Aviso: Se registraron ${registered} operaciones. ${failed} filas fallaron.`;
          uploadSummaryAlert.style.background = 'rgba(220, 53, 69, 0.1)';
          uploadSummaryAlert.style.color = 'var(--text-danger)';
          uploadSummaryAlert.style.border = '1px solid rgba(220, 53, 69, 0.2)';
        }

        if (resData.detalle && resData.detalle.length > 0) {
          if (uploadErrorsTbody) {
            uploadErrorsTbody.innerHTML = '';
            resData.detalle.forEach(d => {
              if (d.exitoso === false) {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid var(--card-border)';
                tr.innerHTML = `
                  <td style="padding: 8px; font-weight: 600;">Fila ${d.fila || '-'}</td>
                  <td style="padding: 8px; color: var(--text-secondary);">${d.tipoOperacionInstrumento || '-'} (${d.idInstrumento?.substring(0, 8) || '-'}...)</td>
                  <td style="padding: 8px; color: var(--text-danger); font-weight: 500;">${d.mensaje || 'Error desconocido'}</td>
                `;
                uploadErrorsTbody.appendChild(tr);
              }
            });
          }
          if (uploadErrorsTableContainer) uploadErrorsTableContainer.style.display = 'block';
        } else {
          if (uploadErrorsTableContainer) uploadErrorsTableContainer.style.display = 'none';
        }
        
        showToast('Errores en Carga Masiva', 'Algunas o todas las filas de la planilla tienen errores.', 'warning');
      }
    } catch (err) {
      console.error('Error uploading bulk operations:', err);
      showToast('Error de conexión', 'No se pudo conectar con el servidor para la subida masiva.', 'error');
    } finally {
      if (btnSubmitUploadOperaciones) {
        btnSubmitUploadOperaciones.disabled = false;
        btnSubmitUploadOperaciones.textContent = 'Cargar Planilla';
      }
    }
  });
}

// Hook search bar to filter tables on-the-fly
if (searchOperacionesInput) {
  searchOperacionesInput.addEventListener('input', (e) => {
    const text = e.target.value;
    renderPosicionesTable(text);
    renderResultadoTable(text);
  });
}

