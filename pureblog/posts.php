<?php 
    include "layout.php";
?>
<!-- <div class="relative post-box">
    <div class="title"><a href="#">Title Here</a></div>
    <div class="created-at">Created at</div>
</div> -->
<title>Index</title>
<?php
    $result = mysqli_query($conn,"SELECT * FROM posts"); // Pagination Down Here !!! 
    if (mysqli_num_rows($result)==0) echo "<h1>There is no post right now!</h1>";
    else{
        $post_limit = 2;
        $pages_number = ceil(mysqli_num_rows($result) / $post_limit);
        if (!isset($_GET['page'])){
            $current_page=1;
            $result = mysqli_query($conn,"SELECT * FROM posts LIMIT 0,".$post_limit." ");
        }
        else{
            $current_page = $_GET['page'];
            $current_post = $post_limit * ($current_page-1); // LIMIT p1 = 0,3 | p2=3,3 | p3=6,3 ,....
            $result = mysqli_query($conn,"SELECT * FROM posts LIMIT ".$current_post.",".$post_limit." ;");
        }
        for($i=0;$i<mysqli_num_rows($result);$i++){
            $data = mysqli_fetch_assoc($result);
            echo "<div class='relative post-box'>";
            echo "<div class='title'><a href='/post.php?id=".$data['id']."'>".$data['title']."</a></div>";
            echo "<div class='created-at'><strong>Created at:</strong> ".$data['created_at']."</div>";
            echo "</div>";
        }
    }
?>
<div class="relative page-btn-box">
    <?php 
        for($p=1;$p<=$pages_number;$p++){
            echo "<a href='posts.php?page=".$p." '> $p </a>";
        }
    ?>
</div>