<?php
  //Connexion a la base donnees
  try {
    $connexion = new PDO('pgsql:host=localhost; port=5433; dbname=web_map_flood', 'postgres', 'gager2019');
    if($connexion){
      echo "Connexion bien etablie";
    }
} catch (PDOException $e) {
    echo $e->getMessage(); //Sinon affiche le message d'erreur
}
$connexion=null;
?>