<template>
    <td class="text-right value-td px-2">
        <v-text-field
            class="pa-0 mt-n3"
            v-model.number="editableScore"
            variant="underlined"
            density="compact"
            hide-details="true"
            :rules="scoreRules"
            reverse
            @input="$emit('update:score', $event.target.value)"
        ></v-text-field>
    </td>
    <OverviewListRowCell
        v-model:isRewrite="editableIsRewrite"
        :percentage="percentage"
        :grade="grade"
        :isRewriteable="true"
    />
</template>

<script>
import OverviewListRowCell from '@/components/overview/row/cell/OverviewListRowCell.vue';

export default {
    name: 'OverviewListRowEditableCell',

    components: { OverviewListRowCell },

    props: {
        validationRule: {
            type: Function,
            required: false
        },
        // Data
        score: {
            type: String,
            required: false
        },
        isRewrite: {
            type: Boolean,
            required: false,
            default: false
        },
        percentage: {
            type: String,
            required: false
        },
        grade: {
            type: String,
            required: false
        }
    },

    emits: ['update:score', 'update:isRewrite'],

    data() {
        return {
            editableScore: null,
            editableIsRewrite: null,
            scoreRules: [
                (value) => {
                    if (this.validationRule === undefined) return true;
                    return this.validationRule(value);
                }
            ]
        };
    },

    created() {
        this.editableScore = this.score;
        this.editableIsRewrite = this.isRewrite;
    },

    watch: {
        editableIsRewrite() {
            this.$emit('update:isRewrite', this.editableIsRewrite);
        }
    }
};
</script>

<style scoped>
table tr td:nth-child(3n) {
    border-left: 1px solid #ffffff35;
}

.value-td {
    table-layout: fixed;
    word-wrap: break-word;
    width: 3rem;
}
</style>
