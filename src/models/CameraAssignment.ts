 export class CameraAssignmentEntity {
    public ID: number;
    public CameraId: number;
    public VehicleId: number;
    public DateCreated: Date;
    public Deleted: boolean;
}

// The assignment as I want to work with it in the view
// I would handle all of this with an ORM but since I am faking
// the database stuff I added this in there
export class CameraAssignment {    
    public ID: number;
    public CameraId: number;
    public CameraDeviceNo: string;
    public VehicleId: number;
    public VehicleName: string;
    public DateCreated: Date;
    public Deleted: boolean;
}