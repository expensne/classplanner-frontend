<template>
    <v-dialog v-model="show" width="500" @keydown.esc="cancel">
        <v-card :title="title">
            <v-card-text>
                {{ message }}
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray" variant="outlined" @click="cancel"> Cancel </v-btn>
                <v-btn color="error" variant="flat" @click="confirm"> Delete </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "ConfirmDialog",

    emits: ["onConfirm", "onCancel", "input"],

    props: {
        value: {
            type: Boolean
        },
        title: {
            type: String,
            default: "Confirm"
        },
        message: {
            type: String,
            default: ""
        }
    },

    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    },

    methods: {
        confirm() {
            this.$emit("onConfirm");
        },
        cancel() {
            this.$emit("onCancel");
        }
    }
};
</script>
