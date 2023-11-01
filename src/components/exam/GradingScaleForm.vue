<template>
    <v-container class="pa-0">
        <v-row v-for="(_, index) in percents" :key="index" dense>
            <v-col class="align-self-center">
                <v-icon :icon="`mdi-numeric-${index + 1}-box`"></v-icon>
            </v-col>

            <v-col cols="5">
                <v-text-field
                    label="Score"
                    variant="underlined"
                    type="number"
                    required
                    v-model.number="scores[index]"
                    :rules="scoreValueRules"
                    @input="handleScoreChange"
                ></v-text-field>
            </v-col>

            <v-col cols="5">
                <v-text-field
                    label="Percent"
                    suffix="%"
                    variant="underlined"
                    type="number"
                    required
                    v-model.number="editablePercents[index]"
                    :rules="percentValueRules"
                    @input="handlePercentChange"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="mt-n2">
            <v-col>
                <v-btn
                    prepend-icon="mdi-close-circle"
                    color="warning"
                    variant="outlined"
                    @click="handleReset"
                >
                    Reset to default
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script scoped>
export default {
    name: 'GradingScaleForm',

    props: {
        maxScore: {
            type: Number,
            required: true
        },
        percents: {
            type: Array,
            required: true
        }
    },

    emits: ['update:percents'],

    data() {
        return {
            editablePercents: null,
            scores: null,
            scoreValueRules: [(value) => this.isValidScore(value)],
            percentValueRules: [(value) => this.isValidPercent(value)]
        };
    },

    created() {
        this.setDefaults();
    },

    methods: {
        setDefaults() {
            let defaults = this.percents;

            this.scores = new Array(defaults.length);
            this.editablePercents = defaults.slice();
            this.scores = this.getScores(defaults);
        },
        handleReset() {
            this.setDefaults();
        },
        getScores(percents) {
            let scores = new Array(percents.length);
            for (let i = 0; i < percents.length; i++)
                scores[i] = Math.round((percents[i] * this.maxScore) / 100.0);
            return scores;
        },
        getPercents(scores) {
            let percents = new Array(scores.length);
            for (let i = 0; i < scores.length; i++)
                percents[i] = Math.round((scores[i] * 100.0) / this.maxScore);
            return percents;
        },
        isValidScore(value) {
            if (value == null) return false;
            value = Number(value);
            if (isNaN(value) || value < 0 || value > this.maxScore) return false;
            // scores must be in descending order
            let orderOkay = true;
            for (let i = 1; i < this.scores.length; i++) {
                if (this.scores[i] >= this.scores[i - 1]) {
                    orderOkay = false;
                    break;
                }
            }
            return orderOkay;
        },
        isValidPercent(value) {
            if (value == null) return false;
            value = Number(value);
            if (isNaN(value) || value < 0 || value > 100) return false;
            // percents must be in descending order
            let orderOkay = true;
            for (let i = 1; i < this.percents.length; i++) {
                if (this.percents[i] >= this.percents[i - 1]) {
                    orderOkay = false;
                    break;
                }
            }
            return orderOkay;
        },
        handlePercentChange(event) {
            let value = event.srcElement.valueAsNumber;
            if (!this.isValidPercent(value)) return;
            this.scores = this.getScores(this.percents);
        },
        handleScoreChange(event) {
            let value = event.srcElement.valueAsNumber;
            if (!this.isValidScore(value)) return;
            this.editablePercents = this.getPercents(this.scores);
        }
    },

    watch: {
        editablePercents: {
            handler: function (newVal) {
                this.$emit('update:percents', newVal);
            },
            deep: true
        }
    }
};
</script>
