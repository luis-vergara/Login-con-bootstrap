/*(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCrOgKbLLquj52VJ3IsmTa0ltWcXN9MXPo",
        authDomain: "usuarios-c6678.firebaseapp.com",
        databaseURL: "https://usuarios-c6678.firebaseio.com",
        projectId: "usuarios-c6678",
        storageBucket: "usuarios-c6678.appspot.com",
        messagingSenderId: "719932591775"
    };
    firebase.initializeApp(config);
    const usuario = document.getElementById('usuario');
    const contrasena = document.getElementById('contrasena');
    const btnlogin = document.getElementById('btnlogin');
    const btnlogout = document.getElementById('btnlogout');

    //Añadir Evento login
    btnlogin.addEventListener('click', e =>{
        //Obtener email y pass
        const email = usuario.value;
        const pass = contrasena.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));   
    });
    btnlogout.addEventListener('click', e =>{
        firebase.auth().signOut();
    });
    // Añadir un listener en tiempo real
    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log(firebaseUser);
            btnlogout.classList.remove('hide');
        }else{
            console.log('no logueado');
            //btnlogout.classList.add('hide');
        }
        
    });
});*/


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