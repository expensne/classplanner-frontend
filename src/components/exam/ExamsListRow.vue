<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ maxPoints }}</td>
        <td>
            <v-tooltip
                v-for="grade in gradeOrder"
                :key="grade"
                :text="gradeInfo[grade].label"
                location="top"
            >
                <template v-slot:activator="{ props }">
                    <v-chip class="ma-1" :color="gradeInfo[grade].color" variant="outlined" v-bind="props">
                        {{ gradingScale[grade] }}
                    </v-chip>
                </template>
            </v-tooltip>
        </td>

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
import { GRADE_ORDER, GRADE_INFO } from "@/utils/constants";

export default {
    name: "ExamsListRow",

    emits: ["editClicked", "deleteClicked"],

    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        maxPoints: {
            type: Number,
            required: true
        },
        gradingScale: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            gradeOrder: GRADE_ORDER,
            gradeInfo: GRADE_INFO
        };
    },

    methods: {
        editClicked() {
            this.$emit("editClicked", this.id);
        },
        deleteClicked() {
            this.$emit("deleteClicked", this.id);
        }
    }
};
</script>
