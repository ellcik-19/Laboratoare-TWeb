<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nume = $_POST['nume'] ?? '';
    $email = $_POST['email'] ?? '';
    $suma = $_POST['suma'] ?? 0;
    $organizatie = $_POST['organizatie'] ?? '';
    
    if (!empty($nume) && !empty($email) && $suma >= 5 && !empty($organizatie)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO donatii (nume, email, suma, organizatie) VALUES (?, ?, ?, ?)");
            $stmt->execute([$nume, $email, $suma, $organizatie]);
            
            $organizatii = [
                'wwf' => 'WWF Whale Program',
                'greenpeace' => 'Greenpeace',
                'oceancare' => 'OceanCare'
            ];
            $orgNume = $organizatii[$organizatie] ?? $organizatie;
            
            echo json_encode([
                'success' => true,
                'message' => "Mulțumim $nume! Donația de {$suma}€ către {$orgNume} a fost înregistrată."
            ]);
        } catch(PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => "Eroare la salvare"
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => "Completează toate câmpurile! Suma minimă: 5€"
        ]);
    }
}
?>