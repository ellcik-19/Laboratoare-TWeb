<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nume = $_POST['nume'] ?? 'Anonim';
    $scor = intval($_POST['scor'] ?? 0);
    $total = intval($_POST['total'] ?? 0);
    
    if (!empty($nume) && $scor <= $total) {
        try {
            $stmt = $pdo->prepare("INSERT INTO quiz_rezultate (nume, scor, total) VALUES (?, ?, ?)");
            $stmt->execute([$nume, $scor, $total]);
            
            echo json_encode([
                'success' => true,
                'message' => "$nume, ai obținut $scor din $total puncte!"
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
            'message' => "Date invalide!"
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => "Metodă invalidă!"
    ]);
}
?>