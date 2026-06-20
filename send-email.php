<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $fullName = htmlspecialchars($data['fullName']);
    $email = htmlspecialchars($data['email']);
    $phone = htmlspecialchars($data['phone']);
    $subject = htmlspecialchars($data['subject']);
    $city = htmlspecialchars($data['city']);
    $state = htmlspecialchars($data['state']);
    $address = htmlspecialchars($data['address']);
    $message = htmlspecialchars($data['message']);
    
    $to = 'abhinavkalamahavidyalaya@gmail.com';
    $subject_line = 'New Contact Form Submission: ' . $subject;
    
    $email_body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Full Name:</strong> $fullName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>City:</strong> $city</p>
        <p><strong>State:</strong> $state</p>
        <p><strong>Address:</strong> $address</p>
        <p><strong>Message:</strong><br>$message</p>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $email\r\n";
    
    if (mail($to, $subject_line, $email_body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email']);
    }
}
?>