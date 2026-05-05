<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nume = $_POST['nume'] ?? '';
    $email = $_POST['email'] ?? '';
    $tara = $_POST['tara'] ?? '';
    $mesaj = $_POST['mesaj'] ?? '';
    
    $cod_semnatura = strtoupper(substr(uniqid(), -6));
    
    if (!empty($nume) && !empty($email) && !empty($tara)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO petitii (nume, email, tara, mesaj, cod_semnatura) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$nume, $email, $tara, $mesaj, $cod_semnatura]);
            
            echo json_encode([
                'success' => true,
                'message' => "Mulțumim $nume! Semnătura #$cod_semnatura a fost înregistrată."
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
            'message' => "Completează numele, emailul și țara!"
        ]);
    }
}
?>