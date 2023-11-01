<template>
    <td class="text-right text-disabled value-td px-0">
        <span v-if="percentage">{{ percentage }}%</span>
    </td>
    <td
        class="text-right text-disabled value-td px-2 font-italic font-weight-thin"
        @dblclick="handleGradeClicked"
    >
        <span v-if="grade">
            {{ grade }}
            <span
                v-if="isRewriteable"
                :class="{ 'text-high-emphasis': editableIsRewrite }"
                v-html="gradeSuffix"
            ></span>
        </span>
    </td>
</template>

<script>
export default {
    name: 'OverviewListRowCell',

    emits: ['update:isRewrite'],

    props: {
        percentage: {
            type: String,
            required: false
        },
        grade: {
            type: String,
            required: false
        },
        isRewriteable: {
            type: Boolean,
            required: false,
            default: false
        },
        isRewrite: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            editableIsRewrite: null
        };
    },

    created() {
        this.editableIsRewrite = this.isRewrite;
    },

    computed: {
        gradeSuffix() {
            return this.editableIsRewrite ? '*' : '&nbsp;';
        }
    },

    methods: {
        handleGradeClicked() {
            if (!this.isRewriteable) return;

            // Prevent selection of text
            window.getSelection()?.removeAllRanges();

            this.editableIsRewrite = !this.editableIsRewrite;
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
