<template>
    <tr>
        <td>{{ lastName }}</td>
        <td>{{ firstName }}</td>
        <td>
            <div class="d-flex">
                <v-btn
                    variant="text"
                    density="compact"
                    icon="mdi-pencil-outline"
                    @click="editClicked"
                ></v-btn>
                <v-btn
                    variant="text"
                    density="compact"
                    icon="mdi-delete-outline"
                    @click="deleteClicked"
                ></v-btn>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'StudentsListRow',

    props: {
        id: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },

    emits: ['editClicked', 'deleteClicked'],

    methods: {
        editClicked() {
            this.$emit('editClicked', this.id);
        },
        deleteClicked() {
            this.$emit('deleteClicked', this.id);
        }
    }
};
</script>
