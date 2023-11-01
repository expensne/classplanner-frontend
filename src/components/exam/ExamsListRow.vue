<template>
    <tr>
        <td>
            {{ name }}
        </td>
        <td>
            <v-tooltip :text="scoreTooltipText">
                <template v-slot:activator="{ props }">
                    <p v-bind="props">
                        <v-dialog width="500">
                            <!-- Info Button -->
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    class="elevation-0 px-0"
                                    v-bind="props"
                                    density="compact"
                                    :text="maxScore.toString()"
                                    append-icon="mdi-information-outline"
                                ></v-btn>
                            </template>

                            <!-- Dialog Content -->
                            <template v-slot:default="{ isActive }">
                                <v-card :title="name">
                                    <v-card-text>
                                        <div>
                                            <b>Max Score: {{ maxScore }}</b>
                                        </div>
                                        <br />
                                        <div>
                                            <b>Grading Scale:</b>
                                        </div>
                                        <div
                                            v-for="(
                                                text, index
                                            ) in scoreTooltipText.split(', ')"
                                            :key="index"
                                        >
                                            {{ text }}
                                        </div>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text="Close Dialog"
                                            color="error"
                                            variation="outlined"
                                            @click="isActive.value = false"
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </p>
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
export default {
    name: 'ExamsListRow',

    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        maxScore: {
            type: Number,
            required: true
        },
        gradingScale: {
            type: Array,
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
    },

    computed: {
        scoreTooltipText() {
            return this.gradingScale
                .map(
                    (percent, index) =>
                        `${(percent * this.maxScore) / 100.0} (${percent}%) = ${
                            index + 1
                        }`
                )
                .join(', ');
        }
    }
};
</script>

<style scoped>
.tooltip-inner {
    white-space: pre-line;
}
</style>
