const html = (email,code) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Confirmation</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            /* Custom CSS */
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Email Confirmation</h2>
                <p>Dear ${email},</p>
                <p>Your verification code is: <strong>${code}</strong></p>
                <p>Please enter this code to verify your email address.</p>
                <p>If you did not request this verification, you can ignore this email.</p>
                <p>Best regards,<br>Your Company</p>
            </div>
        </div>
    </div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    
    
    
    `
}
module.exports = {
    html
}