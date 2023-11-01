<template>
    <td class="text-right value-td px-0">
        <span v-if="score">{{ score }}</span>
    </td>
    <OverviewListRowCell :percentage="percentage" :grade="grade" />
</template>

<script>
import OverviewListRowCell from '@/components/overview/row/cell/OverviewListRowCell.vue';

export default {
    name: 'OverviewListRowDisplayCell',

    components: { OverviewListRowCell },

    props: {
        score: {
            type: String,
            required: false
        },
        percentage: {
            type: String,
            required: false
        },
        grade: {
            type: String,
            required: false
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
