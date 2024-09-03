<!--
@athor Copyright (c) 2024 ALIREZA JAHEDI
-->

<template>
	<div class="wrapper">
		<div>
			<input
				name="selected-input"
				type="text"
				id="custom-input"
				placeholder="انتخاب تاریخ"
			/>
			<VuePersianDatetimePicker
				type="date"
				locale="fa"
				v-model="selectedDate"
				format="jYYYY-jMM-jDD"
				displayFormat="dddd jDD jMMMM jYYYY"
				custom-input="#custom-input"
				@input="navigateToDate"
			/>
		</div>
	</div>
</template>

<script>
import {
	getYYYYMMDDFromDate,
	getDateFromFirstdayParam,
} from "../../../utils/date.js";
import { mapState } from "vuex";

//==========================================================
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
	name: "AppNavigationHeaderDatePicker2",
	components: {
		VuePersianDatetimePicker,
	},
	props: {
		isWidget: { type: Boolean, default: false },
	},
	data() {
		return {
			isDatepickerOpen: false,
			userSelectedDate: "",
		};
	},
	computed: {
		...mapState({
			locale: (state) => state.settings.momentLocale,
		}),
		selectedDate() {
			if (this.isWidget) {
				return getDateFromFirstdayParam(this.$store.getters.widgetDate);
			}
			return getDateFromFirstdayParam(this.$route.params?.firstDay ?? "now");
		},
		view() {
			if (this.isWidget) {
				return this.$store.getters.widgetView;
			}
			return this.$route.params.view;
		},
	},
	methods: {
		navigateToDate(date) {
			//OKA

			if (this.isWidget) {
				this.$store.commit("setWidgetDate", {
					widgetDate: getYYYYMMDDFromDate(date),
				});
			} else {
				const name = this.$route.name;
				const params = Object.assign({}, this.$route.params, {
					firstDay: getYYYYMMDDFromDate(date),
				});
				// Don't push new route when day didn't change
				if (this.$route.params.firstDay === getYYYYMMDDFromDate(date)) {
					return;
				}
				this.$router.push({ name, params });
			}
		},
	},
};
</script>
<style lang="css">
.vpd-actions button {
	line-height: 0px;
}

#custom-input {
	width: 100%;
	text-align: center;
	/* padding: 4px;
	border: 0px;
	cursor: pointer;
	color: black;
	margin: 4px;
	min-height: 36px;
	border-radius: 20px;
	outline: 0px solid transparent;
	outline-offset: 0px; 
	background-color: #e5eff5;*/
}
</style>
