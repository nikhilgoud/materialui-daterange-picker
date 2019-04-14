import React from "react";
import {
	Paper,
	Grid,
	Typography,
	Divider,
	createStyles,
	WithStyles,
	Theme,
	withStyles
} from "@material-ui/core";
import { format, differenceInCalendarMonths } from "date-fns";
import { ArrowRightAlt } from "@material-ui/icons";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import { DateRange, DefinedRange, Setter, NavigationAction } from "../types";
import { MARKERS } from "..";

const styles = (theme: Theme) =>
	createStyles({
		header: {
			padding: "20px 70px"
		},
		headerItem: {
			flex: 1
		},
		divider: {
			borderLeft: `1px solid ${theme.palette.action.hover}`,
			marginBottom: 20
		}
	});

interface MenuProps extends WithStyles<typeof styles> {
	dateRange: DateRange;
	ranges: DefinedRange[];
	firstMonth: Date;
	secondMonth: Date;
	setFirstMonth: Setter<Date>;
	setSecondMonth: Setter<Date>;
	setDateRange: Setter<DateRange>;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Menu: React.FunctionComponent<MenuProps> = props => {
	const {
		classes,
		dateRange,
		firstMonth,
		setFirstMonth,
		secondMonth,
		setSecondMonth,
		ranges,
		setDateRange,
		helpers,
		handlers
	} = props;
	const { startDate, endDate } = dateRange;
	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;

	return (
		<Paper elevation={5} square>
			<Grid container direction="row">
				<Grid>
					<Grid container className={classes.header} alignItems="center">
						<Grid item className={classes.headerItem}>
							<Typography variant="subtitle1">
								{startDate ? format(startDate, "MMMM DD, YYYY") : "Start Date"}
							</Typography>
						</Grid>
						<Grid item className={classes.headerItem}>
							<ArrowRightAlt color="action" />
						</Grid>
						<Grid item className={classes.headerItem}>
							<Typography variant="subtitle1">
								{endDate ? format(endDate, "MMMM DD, YYYY") : "End Date"}
							</Typography>
						</Grid>
					</Grid>
					<Divider />
					<Grid container direction="row" justify="center">
						<Month
							value={firstMonth}
							setValue={setFirstMonth}
							navState={[true, canNavigateCloser]}
							dateRange={dateRange}
							helpers={helpers}
							handlers={handlers}
							marker={MARKERS.FIRST_MONTH}
						/>
						<div className={classes.divider} />
						<Month
							value={secondMonth}
							setValue={setSecondMonth}
							navState={[canNavigateCloser, true]}
							dateRange={dateRange}
							helpers={helpers}
							handlers={handlers}
							marker={MARKERS.SECOND_MONTH}
						/>
					</Grid>
				</Grid>
				<div className={classes.divider} />
				<Grid>
					<DefinedRanges
						selectedRange={dateRange}
						ranges={ranges}
						setRange={setDateRange}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(Menu);