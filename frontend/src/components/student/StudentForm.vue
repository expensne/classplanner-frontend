<template>
    <v-form v-if="editableStudent" v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
            v-model="editableStudent.lastName"
            label="Last Name"
            required
            clearable
            variant="outlined"
            :rules="firstNameRules"
        ></v-text-field>
        <v-text-field
            v-model="editableStudent.firstName"
            label="First Name"
            required
            clearable
            variant="outlined"
            :rules="lastNameRules"
        ></v-text-field>

        <v-btn type="submit" color="success" block class="mt-2"> Save </v-btn>
        <v-btn color="error" variant="outlined" block class="mt-2" @click="handleCancel">
            Cancel
        </v-btn>
    </v-form>
</template>

<script scoped>
export default {
    name: 'StudentForm',

    emits: ['onSubmit', 'onCancel'],

    props: {
        student: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            valid: false,
            editableStudent: null,
            firstNameRules: [
                (value) => {
                    if (value) return true;

                    return 'First name cannot be empty.';
                }
            ],
            lastNameRules: [
                (value) => {
                    if (value) return true;

                    return 'Last name cannot be empty.';
                }
            ]
        };
    },

    created() {
        this.editableStudent = { ...this.student };
    },

    methods: {
        handleSubmit() {
            if (!this.valid) return;
            this.$emit('onSubmit', this.editableStudent);
        },
        handleCancel() {
            this.$emit('onCancel');
        }
    }
};
</script>
