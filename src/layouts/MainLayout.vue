<template>
    <v-layout>
        <v-app-bar :elevation="0" class="border">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>
            <v-app-bar-title>Classplanner</v-app-bar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item
                    link
                    title="Overview"
                    :prepend-icon="MDI_OVERVIEW"
                    @click="onOverviewClicked"
                ></v-list-item>
                <v-list-item
                    link
                    title="Add / Edit Students"
                    :prepend-icon="MDI_STUDENTS"
                    @click="onStudentsClicked"
                ></v-list-item>
                <v-list-item
                    link
                    title="Add / Edit Exams"
                    :prepend-icon="MDI_EXAMS"
                    @click="onExamsClicked"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px">
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<script>
import { MDI_OVERVIEW, MDI_EXAMS, MDI_STUDENTS } from "@/utils/constants";

export default {
    name: "MainLayout",

    setup() {
        return { MDI_OVERVIEW, MDI_EXAMS, MDI_STUDENTS };
    },

    data() {
        return {
            drawer: false
        };
    },

    methods: {
        onOverviewClicked() {
            this.$router.push({ name: "table" });
        },
        onStudentsClicked() {
            this.$router.push({ name: "students-list" });
        },
        onExamsClicked() {
            this.$router.push({ name: "exams-list" });
        }
    }
};
</script>
