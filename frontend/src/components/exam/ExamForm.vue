<template>
    <v-form v-if="editableExam" v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
            v-model="editableExam.name"
            label="Name"
            required
            clearable
            variant="outlined"
            :rules="nameRules"
        ></v-text-field>
        <v-text-field
            v-model.number="editableExam.maxScore"
            label="Max Score"
            required
            variant="outlined"
            type="number"
            :rules="maxScoreRules"
            v-bind:disabled="isEditingGradingScale"
        ></v-text-field>

        <v-expansion-panels v-model="panelIndex" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title>Grading Scale</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <GradingScaleForm
                        :max-score="editableExam.maxScore"
                        v-model:percents="editableExam.gradingScale"
                    />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-btn type="submit" color="success" block class="mt-2"> Save </v-btn>
        <v-btn color="error" variant="outlined" block class="mt-2" @click="handleCancel">
            Cancel
        </v-btn>
    </v-form>
</template>

<script scoped>
import GradingScaleForm from '@/components/exam/GradingScaleForm.vue';

export default {
    name: 'ExamForm',

    components: { GradingScaleForm },

    emits: ['onSubmit', 'onCancel'],

    props: {
        exam: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            valid: false,
            editableExam: null,
            panelIndex: undefined,
            nameRules: [
                (value) => {
                    if (value) return true;
                    return 'Name cannot be empty.';
                }
            ],
            maxScoreRules: [
                (value) => {
                    if (!value) return 'Max score cannot be empty.';
                    value = Number(value);
                    if (isNaN(value)) return 'Max score must be a number.';
                    if (value < 0) return 'Max score cannot be negative.';
                    return true;
                }
            ]
        };
    },

    created() {
        this.editableExam = { ...this.exam };
    },

    computed: {
        isEditingGradingScale() {
            return this.panelIndex === 0;
        }
    },

    methods: {
        handleSubmit() {
            if (!this.valid) return;
            this.$emit('onSubmit', this.editableExam);
        },
        handleCancel() {
            this.$emit('onCancel');
        }
    }
};
</script>

// TODO: max points to possible points
