<?php
    echo'<table class="table" border="2">';
    echo '<th>Nom Quartier</th><th>Nombre habitants</th><th>Superficie (m2)</th>';
    //Connexion a la base donnees
    try {
        $connexion = new PDO('pgsql:host=localhost; port=5433; dbname=web_map_flood', 'postgres', 'gager2019');
        if($connexion){
        }
    } catch (PDOException $e) {
        echo $e->getMessage(); //Sinon affiche le message d'erreur
    }
    //Interrogation de la base de donnees
    $sql = 'SELECT nom_qtr, nbre_hab, superficie FROM quartiers;';
    $resultset = $connexion->prepare($sql);
    $resultset->execute();
    while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) {
        echo'<tr border="2">';
        echo "<td>".$row['nom_qtr']."</td>";
        echo "<td>".$row['nbre_hab']."</td>";
        echo "<td>".$row['superficie']."</td>";
        echo"</tr>";
    }
    $connexion=null;
    echo '</table>';
?> 
