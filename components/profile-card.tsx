import Image from "next/image";

const ProfileCard = () => {
  return (
    <div className="bg-transparent border border-gray-500 shadow-lg rounded-lg p-6 max-w-xxl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36 rounded-full overflow-hidden mb-4">
          <Image
            src="/profile.jpg" // Replace with your profile picture
            alt="Profile Picture"
            className="object-cover"
            sizes="lg,md,sm"
            fill
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">Nicolas Juncos</h2>
        <p className="text-gray-600 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
          ipsum laboriosam modi delectus nobis eos enim eaque doloribus quisquam
          sed minus vero rerum molestiae, sapiente, porro, minima at maiores
          consequatur! Laudantium hic sed, numquam unde debitis pariatur
          possimus illum rerum officiis assumenda ab animi tenetur, quaerat,
          reprehenderit nostrum impedit laborum deleniti repudiandae veniam?
          Obcaecati reprehenderit ad temporibus, fuga nobis quidem! Sint
          similique labore quam expedita iure autem incidunt modi, totam
          obcaecati provident quasi corporis tenetur cum, ad veniam minus a
          animi nobis esse delectus explicabo harum. Esse voluptatibus enim ex!
          Cumque necessitatibus ut, consequuntur eligendi reprehenderit minus
          deleniti, iure accusantium pariatur quos tenetur temporibus explicabo
          totam minima odio ad ex, magni modi.
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
