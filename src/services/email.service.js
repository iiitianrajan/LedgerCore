require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});



// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"SoulTo" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail, name) {
    
const subject = 'Welcome to LedgerCore — Let’s Get Started!';

const text = `Hello ${name},

Welcome to LedgerCore!

Thank you for creating your account. We're excited to have you on board.

LedgerCore helps you keep your financial records organized, transparent, and easy to manage.

Your account is ready, and you can now get started with LedgerCore.

If you have any questions, feel free to reach out to our support team.

Best regards,
The LedgerCore Team

© ${new Date().getFullYear()} LedgerCore. All rights reserved.`;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to LedgerCore</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f6fb; font-family:Arial,Helvetica,sans-serif; color:#1e293b;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background-color:#f3f6fb; padding:40px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
          style="max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Brand Header -->
          <tr>
            <td style="background-color:#0f172a; padding:32px 36px; text-align:center;">
              <div style="font-size:30px; font-weight:700; letter-spacing:-1px; color:#ffffff;">
                Ledger<span style="color:#38bdf8;">Core</span>
              </div>
              <p style="margin:10px 0 0; color:#cbd5e1; font-size:13px; letter-spacing:1px;">
                CLARITY IN EVERY TRANSACTION
              </p>
            </td>
          </tr>

          <!-- Email Content -->
          <tr>
            <td style="padding:40px 36px 32px;">

              <div style="font-size:40px; text-align:center; margin-bottom:20px;">
                🎉
              </div>

              <h1 style="margin:0 0 16px; text-align:center; color:#0f172a;
                font-size:28px; line-height:1.3;">
                Welcome to LedgerCore!
              </h1>

              <p style="margin:0 0 18px; font-size:16px; line-height:1.8; color:#334155;">
                Hello <strong>${name}</strong>,
              </p>

              <p style="margin:0 0 18px; font-size:15px; line-height:1.8; color:#475569;">
                Thank you for creating your account. We're excited to have you
                on board!
              </p>

              <p style="margin:0 0 24px; font-size:15px; line-height:1.8; color:#475569;">
                With LedgerCore, you can keep your financial records organized,
                maintain clear transaction histories, and manage your ledger
                with confidence.
              </p>

              <!-- Highlight Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="background-color:#f0f9ff; border:1px solid #bae6fd;
                border-radius:10px; margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 8px; font-size:15px; font-weight:700; color:#075985;">
                      Your financial journey starts here.
                    </p>
                    <p style="margin:0; font-size:14px; line-height:1.7; color:#334155;">
                      Your registration is complete. You're ready to start
                      exploring LedgerCore and keeping your financial records
                      in order.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px; font-size:15px; line-height:1.8; color:#475569;">
                We're glad you're here. If you need any assistance, our team
                will be happy to help.
              </p>

              <p style="margin:24px 0 0; font-size:15px; line-height:1.8; color:#334155;">
                Best regards,<br />
                <strong style="color:#0f172a;">The LedgerCore Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px; background-color:#f8fafc;
              border-top:1px solid #e2e8f0; text-align:center;">

              <p style="margin:0 0 8px; font-size:12px; color:#64748b; line-height:1.6;">
                This email was sent because an account was registered with LedgerCore.
              </p>

              <p style="margin:0; font-size:12px; color:#94a3b8;">
                &copy; ${new Date().getFullYear()} LedgerCore. All rights reserved.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;


    await sendEmail(userEmail, subject, text, html);
}


async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Successful | LedgerCore';

const text = `
Hello ${name},

Great news! Your transaction has been completed successfully.

TRANSACTION DETAILS
------------------------------
Amount: $${Number(amount).toFixed(2)}
Recipient Account: ${toAccount}
Status: Successful

If you did not authorize this transaction, please contact our support team immediately.

Thank you for choosing LedgerCore.

Best regards,
The LedgerCore Team
`;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transaction Successful</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial,Helvetica,sans-serif; color:#1f2937;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#f4f7fb; padding:32px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a; padding:26px 32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:0.3px;">
                LedgerCore
              </h1>
              <p style="margin:8px 0 0; color:#cbd5e1; font-size:13px;">
                Secure. Reliable. Transparent.
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px;">

              <div style="text-align:center; margin-bottom:24px;">
                <div style="display:inline-block; background-color:#dcfce7; color:#166534;
                  padding:8px 16px; border-radius:20px; font-size:13px; font-weight:bold;">
                  &#10003; TRANSACTION SUCCESSFUL
                </div>

                <h2 style="margin:20px 0 8px; color:#111827; font-size:22px;">
                  Payment completed!
                </h2>

                <p style="margin:0; color:#6b7280; font-size:14px; line-height:1.6;">
                  Hello ${name}, your transaction has been processed successfully.
                </p>
              </div>

              <!-- Transaction Amount -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#f8fafc; border:1px solid #e5e7eb; border-radius:10px;">
                <tr>
                  <td style="padding:24px; text-align:center;">
                    <p style="margin:0 0 8px; color:#6b7280; font-size:13px;">
                      Transaction Amount
                    </p>
                    <p style="margin:0; color:#0f172a; font-size:32px; font-weight:bold;">
                      $${Number(amount).toFixed(2)}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Transaction Details -->
              <h3 style="margin:28px 0 14px; font-size:16px; color:#111827;">
                Transaction details
              </h3>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="font-size:14px;">

                <tr>
                  <td style="padding:12px 0; color:#6b7280; border-bottom:1px solid #e5e7eb;">
                    Recipient account
                  </td>
                  <td align="right" style="padding:12px 0; color:#111827; font-weight:bold;
                    border-bottom:1px solid #e5e7eb; overflow-wrap:anywhere;">
                    ${toAccount}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0; color:#6b7280; border-bottom:1px solid #e5e7eb;">
                    Status
                  </td>
                  <td align="right" style="padding:12px 0; color:#15803d; font-weight:bold;
                    border-bottom:1px solid #e5e7eb;">
                    Successful
                  </td>
                </tr>

              </table>

              <!-- Security Notice -->
              <p style="margin:24px 0 0; padding:14px 16px; background-color:#fff7ed;
                border-left:4px solid #f59e0b; color:#9a3412; font-size:13px; line-height:1.6;">
                <strong>Security notice:</strong> If you did not authorize this transaction,
                please contact our support team immediately.
              </p>

              <p style="margin:28px 0 0; color:#374151; font-size:14px; line-height:1.7;">
                Thank you for choosing <strong>LedgerCore</strong>. We appreciate your trust.
              </p>

              <p style="margin:20px 0 0; color:#374151; font-size:14px; line-height:1.7;">
                Best regards,<br />
                <strong>The LedgerCore Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#f8fafc; text-align:center;
              border-top:1px solid #e5e7eb;">
              <p style="margin:0; color:#6b7280; font-size:12px; line-height:1.6;">
                This is an automated notification. Please do not reply to this email.
              </p>
              <p style="margin:8px 0 0; color:#9ca3af; font-size:11px;">
                &copy; ${new Date().getFullYear()} LedgerCore. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
const subject = 'Transaction Failed | LedgerCore';

const text = `
Hello ${name},

Unfortunately, your transaction could not be completed.

TRANSACTION DETAILS
------------------------------
Amount: $${Number(amount).toFixed(2)}
Recipient Account: ${toAccount}
Status: Failed

Please check your account balance and transaction details before trying again. If the amount has been debited from your account, please contact our support team.

If you did not initiate this transaction, please contact us immediately.

Best regards,
The LedgerCore Team
`;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transaction Failed</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial,Helvetica,sans-serif; color:#1f2937;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#f4f7fb; padding:32px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a; padding:26px 32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:0.3px;">
                LedgerCore
              </h1>
              <p style="margin:8px 0 0; color:#cbd5e1; font-size:13px;">
                Secure. Reliable. Transparent.
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px;">

              <div style="text-align:center; margin-bottom:24px;">
                <div style="display:inline-block; background-color:#fee2e2; color:#991b1b;
                  padding:8px 16px; border-radius:20px; font-size:13px; font-weight:bold;">
                  &#10007; TRANSACTION FAILED
                </div>

                <h2 style="margin:20px 0 8px; color:#111827; font-size:22px;">
                  We couldn't complete your payment
                </h2>

                <p style="margin:0; color:#6b7280; font-size:14px; line-height:1.6;">
                  Hello ${name}, your transaction was unsuccessful. Please review the details below.
                </p>
              </div>

              <!-- Transaction Amount -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#fff7f7; border:1px solid #fecaca; border-radius:10px;">
                <tr>
                  <td style="padding:24px; text-align:center;">
                    <p style="margin:0 0 8px; color:#6b7280; font-size:13px;">
                      Transaction Amount
                    </p>
                    <p style="margin:0; color:#b91c1c; font-size:32px; font-weight:bold;">
                      $${Number(amount).toFixed(2)}
                    </p>
                    <p style="margin:8px 0 0; color:#991b1b; font-size:13px;">
                      Transaction unsuccessful
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Transaction Details -->
              <h3 style="margin:28px 0 14px; font-size:16px; color:#111827;">
                Transaction details
              </h3>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="font-size:14px;">

                <tr>
                  <td style="padding:12px 0; color:#6b7280; border-bottom:1px solid #e5e7eb;">
                    Recipient account
                  </td>
                  <td align="right" style="padding:12px 0; color:#111827; font-weight:bold;
                    border-bottom:1px solid #e5e7eb; overflow-wrap:anywhere;">
                    ${toAccount}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0; color:#6b7280; border-bottom:1px solid #e5e7eb;">
                    Status
                  </td>
                  <td align="right" style="padding:12px 0; color:#b91c1c; font-weight:bold;
                    border-bottom:1px solid #e5e7eb;">
                    Failed
                  </td>
                </tr>

              </table>

              <!-- Troubleshooting Notice -->
              <div style="margin:24px 0 0; padding:16px; background-color:#fff7ed;
                border-left:4px solid #f59e0b; color:#9a3412; font-size:13px; line-height:1.7;">
                <strong>What should you do?</strong><br />
                Check your account balance and transaction details before retrying.
                If the amount was debited despite the failure, contact our support team
                before attempting the payment again.
              </div>

              <!-- Security Notice -->
              <p style="margin:20px 0 0; color:#374151; font-size:13px; line-height:1.7;">
                If you did not initiate this transaction, please contact our support team immediately.
              </p>

              <p style="margin:28px 0 0; color:#374151; font-size:14px; line-height:1.7;">
                We apologize for the inconvenience and appreciate your understanding.
              </p>

              <p style="margin:20px 0 0; color:#374151; font-size:14px; line-height:1.7;">
                Best regards,<br />
                <strong>The LedgerCore Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#f8fafc; text-align:center;
              border-top:1px solid #e5e7eb;">
              <p style="margin:0; color:#6b7280; font-size:12px; line-height:1.6;">
                This is an automated notification. Please do not reply to this email.
              </p>
              <p style="margin:8px 0 0; color:#9ca3af; font-size:11px;">
                &copy; ${new Date().getFullYear()} LedgerCore. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};