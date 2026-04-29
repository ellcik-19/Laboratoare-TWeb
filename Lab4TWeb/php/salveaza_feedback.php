<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nume = $_POST['nume'] ?? '';
    $email = $_POST['email'] ?? '';
    $mesaj = $_POST['mesaj'] ?? '';
    $rating = $_POST['rating'] ?? 0;
    
    if (!empty($nume) && !empty($email) && !empty($mesaj)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO feedback (nume, email, mesaj, rating) VALUES (?, ?, ?, ?)");
            $stmt->execute([$nume, $email, $mesaj, $rating]);
            
            echo json_encode([
                'success' => true, 
                'message' => "Mulțumim $nume! Feedback-ul tău a fost trimis cu succes."
            ]);
        } catch(PDOException $e) {
            echo json_encode([
                'success' => false, 
                'message' => "Eroare la salvare: " . $e->getMessage()
            ]);
        }
    } else {
        echo json_encode([
            'success' => false, 
            'message' => "Completează toate câmpurile!"
        ]);
    }
} else {
    echo json_encode([
        'success' => false, 
        'message' => "Metodă invalidă!"
    ]);
}
?>