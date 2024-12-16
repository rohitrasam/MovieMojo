import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        marginTop: '50px',
        textAlign: 'center',
    },
    formField: {
        marginBottom: '20px',
    },
    payButton: {
        marginTop: '20px',
    },
});

const PaymentPage = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Payment Details
            </Typography>
            <Box component="form" noValidate autoComplete="off" action="/process-payment" method="POST">
                <TextField
                    fullWidth
                    label="Cardholder's Name"
                    name="cardName"
                    variant="outlined"
                    className={classes.formField}
                    required
                />
                <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    variant="outlined"
                    inputProps={{ maxLength: 16 }}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className={classes.formField}
                    required
                />
                <Grid container spacing={2} className={classes.formField}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Expiry Date"
                            name="expiryDate"
                            type="month"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="CVV"
                            name="cvv"
                            type="password"
                            variant="outlined"
                            inputProps={{ maxLength: 3 }}
                            required
                        />
                    </Grid>
                </Grid>
                <TextField
                    fullWidth
                    label="Amount"
                    name="amount"
                    variant="outlined"
                    value="$0.00"
                    InputProps={{ readOnly: true }}
                    className={classes.formField}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    className={classes.payButton}
                >
                    Pay Now
                </Button>
            </Box>
        </Container>
    );
};

export default PaymentPage;
