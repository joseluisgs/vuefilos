<template>
  <b-navbar fixed-top="true" type="is-light">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/vuefilos.png"
                    alt="Vuefilos logo"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="/">
                Portada
            </b-navbar-item>
            <!-- <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown> -->
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                  <b-button tag="router-link"
                    to="/registro"
                    type="is-primary">
                    <strong>Registro</strong>
                  </b-button>
                  <b-button tag="router-link" outlined
                    to="/login"
                    type="is-success">
                    Login
                  </b-button>
                  <b-button tag="router-link" outlined
                    to="/perfil"
                    type="is-info">
                    Perfil
                  </b-button>
                   <b-button
                    outlined
                    type="is-danger"
                    @click="salir">
                    Logout
                  </b-button>
                  <!-- Otra forma de ponerlos -->
                  <!-- <router-link class="button is-light" to="/login">Login</router-link>
                  <router-link class="button is-light" to="/perfil">Perfil</router-link>
                  <a class="button is-light" href="#">Logout</a> -->
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
