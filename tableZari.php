<?php
    echo'<table class="table" border="2">';
    echo '<th>Type de ZARI</th><th>Superficie (m2)</th><th>Profondeur de submersion (m)</th><th>Quartier Touche</th>';
    //Connexion a la base donnees
    try {
        $connexion = new PDO('pgsql:host=localhost; port=5433; dbname=web_map_flood', 'postgres', 'gager2019');
        if($connexion){
        }
    } catch (PDOException $e) {
        echo $e->getMessage(); //Sinon affiche le message d'erreur
    }
    //Interrogation de la base de donnees
    $sql = 'SELECT type_zari, superficie, prof_subm, quartier FROM zari;';
    $resultset = $connexion->prepare($sql);
    $resultset->execute();
    while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) {
        echo'<tr border="2">';
        echo "<td>".$row['type_zari']."</td>";
        echo "<td>".$row['superficie']."</td>";
        echo "<td>".$row['prof_subm']."</td>";
        echo "<td>".$row['quartier']."</td>";
        echo"</tr>";
    }
    $connexion=null;
    echo '</table>';
?> 
