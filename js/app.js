function ingresar(){
    var email = document.getElementById('usuario').value;
    var contrasena = document.getElementById('contrasena').value;
    firebase.auth().signInWithEmailAndPassword(email, contrasena)
            .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
      });

}
function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Existe Usuario Activo')
            aparece(user);
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('No existe Usuario')
          contenido.innerHTML=`
          `;
        }
      });
}
observador();

function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
        contenido.innerHTML = `
        <div class="container mt-3">
        <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
        
        <hr>
        </div>
            <button onclick="cerrar()" class="btn btn-danger">Cerrar sesión</button>
        </div>
        `;
}

function cerrar(){
    firebase.auth().signOut()
     .then(()=>{
        console.log('Saliendo...')
     })
     .catch((error)=>{
        console.log(error)
     })
}