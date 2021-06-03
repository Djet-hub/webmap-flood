<?php
include 'dbconnect.php';

$query = 'SELECT gid, nom_arrond, descriptio, id_arrond, superficie, nbre_hab, geom
FROM public.arrondissements;';
$result = pg_query($dbconnect, $query);

if($result){
echo'salut';
}
?>
